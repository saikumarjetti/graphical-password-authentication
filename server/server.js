const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const util = require("util");
const PORT = 8000;
const app = express();
const helmet = require("helmet");
const multer = require("multer");
const dataLoader = require("./dataLoader");
const aa = require("./test");

// const usersRouter = require("./src/routes/users");
const loginRouter = require("./src/routes/signUp");
const signUpRouter = require("./src/routes/login");
const imagesRouter = require("./src/routes/images");
const corsOptions = {
  origin: "http://localhost:5173", // Replace with the actual origin of your React app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
function LoadFileData() {
  dataLoader.readAllImagesList();

  // Load similar images JSON data
  dataLoader.readAllSimilarListJson();

  // Access the loaded data
  const imageList = dataLoader.getAllImagesList();
  const similarImagesJson = dataLoader.getAllSimilarListJson();

  // Use the loaded data as needed in your application
  // console.log("Image List:", imageList);
  // console.log("Similar Images JSON:", similarImagesJson);
}
// mongoose
// .connect("mongodb://localhost:27017/GPA", {
//   useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

app.use(cors(corsOptions));
helmet({
  crossOriginResourcePolicy: false,
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", loginRouter);
app.use("/", signUpRouter);
app.use("/", imagesRouter);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}....`);
  LoadFileData();
});
