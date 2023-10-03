const express = require("express");
const router = express.Router();
const dataLoader = require("../../dataLoader");

// Call the function to get the data and handle it with .then()

// Access the loaded data
const imageList = dataLoader.getAllImagesList();
const similarImagesJson = dataLoader.getAllSimilarListJson();

// Use the loaded data as needed in your application
// console.log("Image List:", imageList);
// console.log("Similar Images JSON:", similarImagesJson);
// "ido", "inf", "kwm", "pev", "uxq", "yaj", "zrc"
// const imgListToCat = {
//   animals: "ido",
//   flags: "inf",
//   architecture: "kwm",
//   birds: "pev",
//   food: "uxq",
//   cars: "yaj",
//   flowers: "zrc",
// };
let imgFoldersList = [];
let imgsList = {};
// async function getAllImagesList() {
//   const imgsList = {};
//   const imgFolderList = await fs.readdir(`${process.cwd()}/public`); // Use await to wait for the folder list

//   for (const folder of imgFolderList) {
//     try {
//       const files = await fs.readdir(`${process.cwd()}/public/${folder}`);
//       imgsList[folder] = files;
//     } catch (err) {
//       console.error("Error reading folder:", err);
//     }
//   }
//   return { imgsList };
// }

// getAllImagesList()
//   .then((folderList) => {
//     imgsList = { ...folderList["imgsList"] };
//     imgFoldersList = [...Object.keys(folderList)];
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

router.get("/category", async (req, res) => {
  res.json({
    category: Object.keys(dataLoader.imgListToCat),
    length: imgFoldersList.length,
  });
});

// Loop through the imgListToCat object to create routes dynamically 😜
for (const category in dataLoader.imgListToCat) {
  if (dataLoader.imgListToCat.hasOwnProperty(category)) {
    const key = dataLoader.imgListToCat[category];

    router.get(`/images/${category}`, async (req, res) => {
      let data = imgsList[key];
      res.json({
        imageNames: data,
        length: data.length,
      });
    });
  }
}
router.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const folderName = imageName.slice(0, 3);
  console.log(`image name ${imageName}`);
  console.log(`folder name ${folderName}`);
  res.sendFile(process.cwd() + `/public/${folderName}/${imageName}`);
});

module.exports = router;
