const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;
const dataLoader = require("../../dataLoader");
const crypto = require("crypto");

const AllSimilarImagesJson = dataLoader.getAllSimilarListJson();
const findDuplicates = (imgList) => {
  let seen = {}; // An object to store seen elements

  for (let i = 0; i < imgList.length; i++) {
    const img = imgList[i];

    if (seen[img]) {
      console.log(" 🚀 ~ file: signUp.js:18 ~ findDuplicates ~ true:", true);
      return true; // Duplicate found
    } else {
      seen[img] = true; // Mark the element as seen
    }
  }

  console.log(" 🚀 ~ file: signUp.js:24 ~ findDuplicates ~ false:", false);
  return false; // No duplicates found
};
// findDuplicates([
//   "uxqq6k9h5ORCJ.png",
//   "zrc7jwW0GI3SM.png",
//   "kwmB13dyP6922.png",
//   "uxqho2yh0l5Ve.png",
//   "uxqjMdMs9jn3F.png",
//   "yaj4y7Zt63SQH.png",
//   "pev5mQ4PutPQw.png",
//   "uxqavvPuT7X35.png",
//   "uxqumK2CUbNa5.png",
//   "zrcMYq1rlOHng.png",
//   "yajm9gvnBdhVh.png",
//   "zrcpqwIJlybW3.png",
//   "uxqTffVcdA3UN.png",
//   "zrcWfbtiGLJ55.png",
//   "uxqU0DGDFRUYU.png",
//   "uxqCsOqu78fNV.png",
//   "infmjGGc0DQHN.png",
//   "zrc7jwW0GI3SM.png",
//   "uxqjNAzEDD2Q8.png",
//   "uxq40s58vkvz5.png",
//   "uxqI3SVSPwIQU.png",
//   "uxqqSGsBmhtjr.png",
//   "uxqBkCpiDeYEM.png",
//   "uxq2Tfw6ESRXN.png",
//   "uxqt5LCVeoJJH.png",
// ]);

async function getSimilarImages(imgList, size = 3) {
  const result = [...Object.values(imgList)];
  for (img in imgList) {
    let cat = imgList[img].split(".")[0].slice(0, 3);
    let imgName = imgList[img].split(".")[0];
    let limit = size;
    let c = 0;
    for (let i in AllSimilarImagesJson[cat][imgName]) {
      if (limit === 1) {
        break;
      }
      if (!result.includes(AllSimilarImagesJson[cat][imgName][i])) {
        result.push(AllSimilarImagesJson[cat][imgName][i]);

        limit -= 1;
        c += 1;
      }
    }
  }
  return result;
}
async function getRandomImgNames(imgList, len) {
  let result = [];
  let catLen = dataLoader.imgFolderList.length;
  for (let i = 0; i < len; i++) {
    let cat = dataLoader.imgFolderList[Math.floor(Math.random() * catLen)];
    let img =
      dataLoader.getAllImagesList()[cat][
        Math.floor(Math.random() * dataLoader.getAllImagesList()[cat].length)
      ];
    if (!imgList.includes(img)) {
      result.push(img);
    }
  }
  return result;
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
getSimilarImages({
  0: "uxq2Tfw6ESRXN.png",
  1: "uxq40s58vkvz5.png",
  2: "uxqBkCpiDeYEM.png",
  3: "uxqCsOqu78fNV.png",
  4: "uxqI3SVSPwIQU.png",
});
function shuffleImages(array) {
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
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
    let totalImg = 25;
    let finalHash = await computeHash(imageList);

    let similarImages = await getSimilarImages(imageList, (size = 3));

    totalImg = totalImg - similarImages.length;
    let fillinImages = await getRandomImgNames(similarImages, totalImg);

    let finalData = shuffleImages(similarImages.concat(fillinImages));
    if (findDuplicates(finalData)) {
      console.log("ohhh no duplicates ");
      res.status(400).json({ message: "Error creating user", error });
      return;
    }
    for (let i in imageList) {
      if (!similarImages.includes(imageList[i])) {
        console.log(`${imageList[i]} is not present in similar images list`);
        res.status(400).json({ message: "Error creating user", error });
        return;
      }
    }
    const user = new User({
      username,
      password: finalHash,
      failedAttempts: 0,
      locked: false,
      lockExpiry: 0,
      imagesList: finalData,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

module.exports = router;
