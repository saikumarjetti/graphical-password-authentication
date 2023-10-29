const fs = require("fs");
const path = require("path");

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
function readAllImagesList() {
  imgFolderList = fs.readdirSync(path.resolve(__dirname, `./public`));
  for (const folder of imgFolderList) {
    try {
      const files = fs.readdirSync(
        path.resolve(__dirname, `./public/${folder}`)
      );
      imgsList[folder] = files;
    } catch (err) {
      console.error("Error reading folder:", err);
    }
  }
}
readAllImagesList();

// Export functions to load data
module.exports = {
  readAllImagesList,
  getAllImagesList: () => imgsList,
  imgListToCat,
  imgFolderList,
};
