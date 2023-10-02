const express = require("express");
const router = express.Router();
const imgList = ["ido", "inf", "kwm", "pev", "uxq", "yaj", "zrc"];
const imgListToCat = {
  ido: "animals",
  inf: "flags",
  kwm: "architecture",
  pev: "birds",
  uxq: "food",
  yaj: "cars",
  zrc: "flowers",
};

router.get("/category", async (req, res) => {
  res.json({
    category: Object.values(imgListToCat),
    length: imgList.length,
  });
});

router.get("/animals", async (req, res) => {
  res.json({
    category: Object.values(imgListToCat),
    length: imgList.length,
  });
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
