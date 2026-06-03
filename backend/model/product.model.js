const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    tags: {
      type: String, // or [String] if multiple tags
    },

    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
    },

    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
      validate: {
        validator: function (value) {
          return value <= this.originalPrice;
        },
        message: "Discount price must be less than or equal to original price",
      },
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      default: 1,
    },

    images: [
      {
        type: String,
      },
    ],

    shopId: {
      type: String,
      required: true,
    },
    shop :{
        type : Object,
        required : true,
    },
    sold_out :{
        type : Number,
        default :0,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
