const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = express();
const helmet = require("helmet");
const dataLoader = require("./dataLoader");

const loginRouter = require("./src/routes/signUp");
const signUpRouter = require("./src/routes/login");
const imagesRouter = require("./src/routes/images");
let os = require("os");

let networkInterfaces = os.networkInterfaces();
let ip = networkInterfaces["en0"];
ip = ip[0]["family"] === "IPv6" ? ip[1]["address"] : ip[0]["address"];
console.log(`ip = ${ip}`);
// console.log(os.networkInterfaces());
// mongodb+srv://vercel:3yDWhqEPSRfHEAnC@gpa.wae5rua.mongodb.net/?retryWrites=true&w=majority
const uri =
  "mongodb+srv://vercel:3yDWhqEPSRfHEAnC@gpa.wae5rua.mongodb.net/?retryWrites=true&w=majority";
function LoadFileData() {
  dataLoader.readAllImagesList();
}
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
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
