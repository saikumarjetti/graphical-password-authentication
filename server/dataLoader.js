const fs = require("fs");

// Define variables to store the data
let imgsList = {};
let AllSimilarImagesJson = {};
function readAllImagesList() {
  const imgFolderList = fs.readdirSync(`${process.cwd()}/public`); // Use await to wait for the folder list

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
};
