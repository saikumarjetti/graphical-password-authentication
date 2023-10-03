const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;

let AllSimilarImagesJson = {};
let imgsList = {};
// async function getAllSimilarListJson() {
//   const allJsonData = {};
//   const similarImageJsonList = await fs.readdir(
//     `${process.cwd()}/Python-SimilarImages/result`
//   );
//   for (const file of similarImageJsonList) {
//     console.log(file);
//     try {
//       const data = await fs.readFile(
//         `${process.cwd()}/Python-SimilarImages/result/${file}`,
//         "utf8"
//       );
//       const jsonObject = JSON.parse(data);
//       allJsonData[`${file.split(".")[0]}`] = jsonObject;
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
//   return allJsonData;
// }
// getAllSimilarListJson().then((data) => {
//   AllSimilarImagesJson = data;
// });

// async function getSimilarImages(imgList) {}
// getSimilarImages({
//   0: "infWCDmbiJPPa.png",
//   1: "zrcAIFKKxdqzw.png",
//   2: "uxqumK2CUbNa5.png",
//   3: "zrc7K5sYzwuz1.png",
//   4: "uxqBkCpiDeYEM.png",
// })
//   .then((folderList) => {
//     // imgsList = { ...folderList["imgsList"] };
//     // imgFoldersList = [...Object.keys(folderList)];
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

router.get("/users", async (req, res) => {
  const { username } = req.query;
  console.log(username);
  try {
    if (username) {
      const users = await User.find({ username });
      res.json(users);
    } else {
      const users = await User.find();
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
// Get user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.find(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Create a new user
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      failedAttempts: 0,
      locked: false,
      lockExpiry: 0,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

module.exports = router;
