const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const router = express.Router();
const PORT = 8000;
const app = express();
const helmet = require("helmet");
const multer = require("multer");

// const usersRouter = require("./src/routes/users");
const loginRouter = require("./src/routes/signUp");
const signUpRouter = require("./src/routes/login");
const imagesRouter = require("./src/routes/images");

mongoose
  .connect("mongodb://localhost:27017/GPA", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.static("public"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", loginRouter);
app.use("/", signUpRouter);
app.use("/images", imagesRouter);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}....`);
});
