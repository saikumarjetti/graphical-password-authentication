const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;
const dataLoader = require("../../dataLoader");

const AllSimilarImagesJson = dataLoader.getAllSimilarListJson();
function getSimilarImages(imgList, size = 3) {
  const result = {};
  for (img in imgList) {
    let cat = imgList[img].split(".")[0].slice(0, 3);
    let imgName = imgList[img].split(".")[0];

    result[imgName] = Object.values(AllSimilarImagesJson[cat][imgName]).slice(
      0,
      size
    );
  }

  return result;
}
function getRandomImgNames(len) {
  let result = [];
  let catLen = dataLoader.imgFolderList.length;
  for (let i = 0; i < len; i++) {
    let cat = dataLoader.imgFolderList[Math.floor(Math.random() * catLen)];
    let img =
      dataLoader.getAllImagesList()[cat][
        Math.floor(Math.random() * dataLoader.getAllImagesList()[cat].length)
      ];
    result.push(img);
  }
}
getRandomImgNames(3);
// console.log(
//   getSimilarImages({
//     0: "infWCDmbiJPPa.png",
//     1: "zrcAIFKKxdqzw.png",
//     2: "uxqumK2CUbNa5.png",
//     3: "zrc7K5sYzwuz1.png",
//     4: "uxqBkCpiDeYEM.png",
//   })
// );

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
