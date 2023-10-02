const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
// Get all users
router.get("/test", async (_req, res) => {
  console.log("logging test");
  try {
    const data = await User.findOne({ username: "a" });
    if (data) {
      res.json({ server: "working", DB: "working" });
    }
  } catch {
    res.status(401).json({ server: "working", DB: "not working" });
  }
});
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
