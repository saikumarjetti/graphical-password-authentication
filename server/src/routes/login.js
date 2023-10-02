const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function createJwtToken(user) {
  const token = jwt.sign({ userId: user._id, username: user.username }, "key", {
    expiresIn: "24h",
  });
  return token;
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(req.query);
  try {
    // Find the user by username in your database
    const user = await User.findOne({ username });
    // Check if the provided password matches the stored hashed password
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    if (user.locked) {
      const currentTime = new Date().getTime();
      if (currentTime < user.lockExpiry) {
        // Calculate remaining lock time
        const remainingLockTime = Math.floor(
          (user.lockExpiry - currentTime) / 60000
        ); // in minutes
        return res.status(401).json({
          message: `Account locked please try after ${remainingLockTime} mins .`,
          remainingLockTime: remainingLockTime,
        });
      } else {
        // Reset lock status as the lock has expired
        user.locked = false;
        user.lockExpiry = null;
        await user.save();
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      user.failedAttempts++;

      if (user.failedAttempts >= 5) {
        // Lock the account for 1 hour
        const lockExpiry = new Date();
        lockExpiry.setHours(lockExpiry.getHours() + 1);
        user.locked = true;
        user.lockExpiry = lockExpiry;
        user.failedAttempts = 0; // Reset failed login attempts
        await user.save();

        return res.status(401).json({
          message:
            "Authentication failed. Invalid password. Account locked for 1 hour.",
        });
      } else {
        await user.save();
        return res.status(401).json({
          message: `Authentication failed. Invalid password. You have ${
            5 - user.failedAttempts
          } more attempts before account locking.`,
        });
      }
    }

    // If the password is valid, reset failed login attempts
    user.failedAttempts = 0;
    user.lockExpiry = 0;
    await user.save();

    const token = createJwtToken(user);
    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
