const express = require("express");
const path = require("path");
const router = express.Router();

const { upload } = require("../multer.js");
const User = require("../model/user.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(
      new ErrorHandler("user already exists, try with new email", 400),
    );
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name,
    email,
    password,
    avatar: {
      public_id: filename,
      url: `/${fileUrl}`,
    },
  };

  const newUser = await User.create(user);
  res.status(201).json({
    success: true,
    newUser,
  });
  console.log(user);
});
module.exports = router;
