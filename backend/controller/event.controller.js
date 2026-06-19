const express = require("express");
const router = express.Router();
const Event = require("../model/event.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop.model");
const { upload } = require("../multer");
// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("shop id is invailid", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => file.filename);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const product = await Event.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);
// all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
// get all events of a shop

router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// delete event
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.id;

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return next(new ErrorHandler("event not found with this ID", 404));
    }

    res.status(200).json({
      success: true,
      message: "event deleted successfully",
    });
  }),
);
module.exports = router;
