

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");

const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop.model.js");
const {upload}  = require("../multer.js");

const cloudinary = require ('../utils/cloudinary.js')
const sendShopToken = require("../utils/jwtToken");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// ================= CREATE SHOP =================
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/create-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("\n================ CREATE SHOP HIT ================");
      console.log("📦 BODY RECEIVED:", req.body);

      const { email } = req.body;

      const sellerEmail = await Shop.findOne({ email });

      if (sellerEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // ✅ Upload base64 image
    //  const cloudinary = require("cloudinary").v2;

const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
  folder: "avatars",
});

      console.log("✅ Cloudinary Upload Success:");
      console.log("   - public_id:", myCloud.public_id);
      console.log("   - url:", myCloud.secure_url);

      const seller = {
        name: req.body.name,
        email,
        password: req.body.password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      };

      const activationToken = createActivationToken(seller);

      // const activationUrl = `https://eshop-tutorial-pyri.vercel.app/seller/activation/${activationToken}`;
      const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;
      console.log("ACTIVATION URL:", activationUrl);

      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, click: ${activationUrl}`,
      });

      return res.status(201).json({
        success: true,
        message: `Check email: ${seller.email}`,
      });

    } catch (error) {
      console.error("💥 CREATE SHOP ERROR:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// ================= ACTIVATE SHOP =================
// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     console.log("🔥 [ACTIVATION HIT]");
//     console.log("📦 BODY:", req.body);

//     try {
//       const { activation_token } = req.body;

//       if (!activation_token) {
//         console.log("❌ No activation token provided");
//         return next(new ErrorHandler("Activation token missing", 400));
//       }

//       let newSeller;

//       try {
//         newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
//         console.log("✅ Token verified");
//       } catch (err) {
//         console.log("❌ JWT ERROR:", err.name);

//         if (err.name === "TokenExpiredError") {
//           return next(new ErrorHandler("Token expired", 400));
//         }
//         if (err.name === "JsonWebTokenError") {
//           return next(new ErrorHandler("Invalid token", 400));
//         }

//         return next(new ErrorHandler("Token verification failed", 400));
//       }

//       const { name, email, password, avatar, zipCode, address, phoneNumber } =
//         newSeller;

//       console.log("🧾 Decoded Seller:", newSeller);

//       let seller = await Shop.findOne({ email });

//       if (seller) {
//         console.log("❌ User already exists:", email);
//         return next(new ErrorHandler("User already exists", 400));
//       }

//       seller = await Shop.create({
//         name,
//         email,
//         avatar,
//         password,
//         zipCode,
//         address,
//         phoneNumber,
//       });

//       console.log("✅ Seller created in DB:", seller._id);

//       sendShopToken(seller, 201, res);
//     } catch (error) {
//       console.error("💥 ACTIVATION ERROR:", error);
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }),
// );

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    console.log("\n================ ACTIVATION HIT ================");
    console.log("📦 RAW BODY:", req.body);

    try {
      const { activation_token } = req.body;

      console.log("🔐 TOKEN RECEIVED:", !!activation_token);

      if (!activation_token) {
        console.log("❌ NO TOKEN PROVIDED");
        return next(new ErrorHandler("Activation token missing", 400));
      }

      console.log("🔍 Verifying JWT token...");

      let newSeller;

      try {
        newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );

        console.log("✅ TOKEN VERIFIED SUCCESSFULLY");
        console.log("🧾 DECODED DATA:", newSeller);
      } catch (err) {
        console.log("❌ JWT VERIFICATION FAILED");
        console.log("🚨 ERROR NAME:", err.name);
        console.log("🚨 ERROR MESSAGE:", err.message);

        if (err.name === "TokenExpiredError") {
          console.log("⛔ TOKEN EXPIRED");
          return next(new ErrorHandler("Token expired", 400));
        }

        if (err.name === "JsonWebTokenError") {
          console.log("⛔ INVALID TOKEN");
          return next(new ErrorHandler("Invalid token", 400));
        }

        return next(new ErrorHandler("Token verification failed", 400));
      }

      const {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      } = newSeller;

      console.log("🔍 Checking if seller already exists:", email);

      let seller = await Shop.findOne({ email });

      if (seller) {
        console.log("❌ DUPLICATE USER FOUND:", email);
        return next(new ErrorHandler("User already exists", 400));
      }

      console.log("🆕 Creating seller in DB...");

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });

      console.log("✅ SELLER CREATED SUCCESSFULLY");
      console.log("🆔 ID:", seller._id);

      console.log("🔐 Sending auth token...");

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.error("💥 ACTIVATION ROUTE ERROR:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
