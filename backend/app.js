const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend port
    credentials: true,
  }),
);
app.use("/", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// routes
const user =require("./controller/user.controller.js");
const shop =require("./controller/shop.controller.js");
const product =require("./controller/product.controller.js");
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);

// error middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
