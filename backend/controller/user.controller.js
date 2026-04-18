// const express = require("express");
// const path = require("path");
// const router = express.Router();

// const { upload } = require("../multer.js");
// const User = require("../model/user.js");
// const ErrorHandler = require("../utils/ErrorHandler.js");
// const catchAsyncError = require("../middleware/catchAsyncErrors.js");
// const sendToken = require("../utils/jwtToken.js")
// router.post("/create-user", upload.single("file"), async (req, res, next) => {
//   const { name, email, password } = req.body;
//   const userEmail = await User.findOne({ email });

//   if (userEmail) {
//     return next(
//       new ErrorHandler("user already exists, try with new email", 400),
//     );
//   }
//   const filename = req.file.filename;
//   const fileUrl = path.join(filename);

//   const user = {
//     name,
//     email,
//     password,
//     avatar: {
//       public_id: filename,
//       url: `/${fileUrl}`,
//     },
//   };

//   const newUser = await User.create(user);
//   res.status(201).json({
//     success: true,
//     newUser,
//   });
//   console.log(user);
// });

// //activate user

// router.post(
//   "/activation",
//   catchAsyncError(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;
//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET,
//       );
//       if (!newUser) {
//         return next(new ErrorHandler("Invalid Token", 400));
//       }

//       const { name, email, password, avatar } = newUser;
//       User.create({
//         name,
//         email,
//         avatar,
//         password,
//       });

//       sendToken(newUser,201,res)
//     } catch (error) {}
//   }),
// );
// module.exports = router;




const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { upload } = require("../multer.js");
const User = require("../model/user.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js"); // or ../utils/senMail.js if your file name is still senMail.js

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// create user + send activation email
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(
        new ErrorHandler("User already exists, try with new email", 400)
      );
    }

    if (!req.file) {
      return next(new ErrorHandler("Avatar file is required", 400));
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

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account!`,
      activationToken,
    });
  })
);

// activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    const { activation_token } = req.body;

    const newUser = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    sendToken(user, 201, res);
  })
);

module.exports = router;
