const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;
// const dataLoader = require("../../dataLoader");
const crypto = require("crypto");

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

// function shuffleImages(array) {
//   let currentIndex = array.length;
//   let randomIndex = 0;

//   // While there remain elements to shuffle.
//   while (currentIndex > 0) {
//     // Pick a remaining element.
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// }
router.get("/users", async (req, res) => {
  const { username } = req.query;
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
    const { username, imageList } = req.body;
    const passwordLen = parseInt(req.body.passwordLen, 10);
    // let totalImg = 25;
    const regex = /(?:^|\/)([^/.]+)\.(?:png|jpg|gif)$/;
    console.log(imageList);

    let finalData = imageList.map((item) => {
      return regex.exec(item)[1] + ".png";
    });
    console.log("data");
    console.log(finalData);
    let finalHash = await computeHash(finalData);

    const user = new User({
      username,
      password: finalHash,
      failedAttempts: 0,
      locked: false,
      lockExpiry: 0,
    });

    await user.save();
    res.status(201).json({ username, user, message: "Good to go Bro" });
  } catch (error) {
    res.status(400).json({ message: "Error creating user1", error });
    console.log(error);
  }
});

module.exports = router;
