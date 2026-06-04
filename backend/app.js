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
const event =require("./controller/event.controller.js");
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);

// error middleware
const errorMiddleware = require("./middleware/error");
const { events } = require("./model/event.model.js");
app.use(errorMiddleware);

module.exports = app;
