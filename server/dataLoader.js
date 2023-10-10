const fs = require("fs");

// Define variables to store the data
const imgListToCat = {
  animals: "ldo",
  flags: "inf",
  architecture: "kwm",
  birds: "pev",
  food: "uxq",
  cars: "yaj",
  flowers: "zrc",
};
let imgsList = {};
let imgFolderList = [];
let AllSimilarImagesJson = {};
function readAllImagesList() {
  imgFolderList = fs.readdirSync(`${process.cwd()}/public`);
  for (const folder of imgFolderList) {
    try {
      const files = fs.readdirSync(`${process.cwd()}/public/${folder}`);
      imgsList[folder] = files;
    } catch (err) {
      console.error("Error reading folder:", err);
    }
  }
}
readAllImagesList();

function readAllSimilarListJson() {
  const similarImageJsonList = fs.readdirSync(
    `${process.cwd()}/Python-SimilarImages/result`
  );
  for (const file of similarImageJsonList) {
    try {
      const data = fs.readFileSync(
        `${process.cwd()}/Python-SimilarImages/result/${file}`,
        "utf8"
      );
      const jsonObject = JSON.parse(data);
      AllSimilarImagesJson[`${file.split(".")[0]}`] = jsonObject;
      //   console.log(AllSimilarImagesJson);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
readAllSimilarListJson();

// Export functions to load data
module.exports = {
  readAllImagesList,
  readAllSimilarListJson,
  getAllImagesList: () => imgsList,
  getAllSimilarListJson: () => AllSimilarImagesJson,
  imgListToCat,
  imgFolderList,
};
