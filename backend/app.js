const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler.js");
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true}));

app.use(ErrorHandler);
module.exports = app;