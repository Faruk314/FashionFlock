require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const stripeRoute = require("./routes/stripeRoute");
const errorHandler = require("./utils/errorHandler");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const MinioClient = require("./utils/minioClient");
const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to mongo");
});

let server = app.listen(5000, () => {
  console.log("Server started listening on port 5000");
});

server.setTimeout(5000);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

MinioClient.bucketExists("ecommerc-site", (exists) => {
  exists ? null : console.log("Minio Bucket does not exist!");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", stripeRoute);

app.use(errorHandler);
