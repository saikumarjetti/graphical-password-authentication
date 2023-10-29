const express = require("express");
const router = express.Router();
// const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const crypto = require("crypto");

// const { computeHash } = require("../../dataLoader");
function createJwtToken(user) {
  const token = jwt.sign({ userId: user._id, username: user.username }, "key", {
    expiresIn: "24h",
  });
  return token;
}

const computeHash = async (imgList) => {
  let hash = {};
  for (let i in imgList) {
    const FolderName = imgList[i].slice(0, 3);

    const fileName = imgList[i];

    const file = await fs.readFile(
      `${process.cwd()}/public/${FolderName}/${fileName}`
    );

    const hex = crypto.createHash("sha256").update(file).digest("hex");
    hash[i] = hex;
  }
  let finalHash = Object.values(hash).join("");
  finalHash = crypto.createHash("sha256").update(finalHash).digest("hex");
  return finalHash;
};
// computeHash({
//   0: "uxq2Tfw6ESRXN.png",
//   1: "uxqCsOqu78fNV.png",
//   2: "uxqho2yh0l5Ve.png",
//   3: "uxqt5LCVeoJJH.png",
//   4: "uxqTffVcdA3UN.png",
// });
router.get("/test", async (req, res) => {
  try {
    return res.status(200).json({ message: "good to go." });
  } catch {}
});

// router.post("/login", async (req, res) => {
//   const { username, imageList } = req.body;
//   console.log(req.body);
//   console.log(req.query);

//   try {
//     // Find the user by username in your database
//     const user = await User.findOne({ username });
//     // Check if the provided password matches the stored hashed password
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Authentication failed. User not found." });
//     }
//     if (user.locked) {
//       const currentTime = new Date().getTime();
//       if (currentTime < user.lockExpiry) {
//         // Calculate remaining lock time
//         const remainingLockTime = Math.floor(
//           (user.lockExpiry - currentTime) / 60000
//         ); // in minutes
//         return res.status(401).json({
//           message: `Account locked please try after ${remainingLockTime} mins .`,
//           remainingLockTime: remainingLockTime,
//         });
//       } else {
//         // Reset lock status as the lock has expired
//         user.locked = false;
//         user.lockExpiry = null;
//         await user.save();
//       }
//     }
//     const regex = /(?:^|\/)([^/.]+)\.(?:png|jpg|gif)$/;
//     console.log(imageList);

//     let finalData = imageList.map((item) => {
//       return regex.exec(item)[1] + ".png";
//     });
//     const computedHash = await computeHash(finalData);

//     const isPasswordValid = computedHash === user.password;
//     console.log(
//       " 🚀 ~ file: login.js:66 ~ router.post ~ isPasswordValid:",
//       isPasswordValid
//     );
//     if (!isPasswordValid) {
//       user.failedAttempts++;

//       if (user.failedAttempts >= 5) {
//         // Lock the account for 1 hour
//         const lockExpiry = new Date();
//         lockExpiry.setHours(lockExpiry.getHours() + 1);
//         user.locked = true;
//         user.lockExpiry = lockExpiry;
//         user.failedAttempts = 0; // Reset failed login attempts
//         await user.save();

//         return res.status(401).json({
//           message:
//             "Authentication failed. Invalid password. Account locked for 1 hour.",
//         });
//       } else {
//         await user.save();
//         return res.status(401).json({
//           message: `Authentication failed. Invalid password. You have ${
//             5 - user.failedAttempts
//           } more attempts before account locking.`,
//         });
//       }
//     }

//     // If the password is valid, reset failed login attempts
//     user.failedAttempts = 0;
//     user.lockExpiry = 0;
//     await user.save();

//     const token = createJwtToken(user);
//     res.json({ token, user, message: "Good to go bro " });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
module.exports = router;
