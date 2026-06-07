const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop.model");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode.model");

// create coupounCode

router.post(
  "/create-coupon-code",isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExist = await CoupounCode.find({
        name: req.body.name,

      });
      console.log(req.body.name)
      if (isCoupounCodeExist.length > 0 ) {
        return next(new ErrorHandler("coupounCode already exist!", 400));
      }
      const coupounCode = await CoupounCode.create(req.body);;

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// get coupons of shop

router.get('/get-coupon/:id',isSeller,catchAsyncErrors(async(req,res,next)=>{
  try {

const couponCodes = await CoupounCode.find({
  "shop._id": req.params.id   // ✅ dot notation
});
    res.status(201).json({
      success: true,
      couponCodes,
    })

  } catch (error) {
 return next(new ErrorHandler(error.message, 500));
  }
})
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports =router;
