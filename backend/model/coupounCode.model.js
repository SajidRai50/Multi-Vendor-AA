const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your coupounCode!"],
        unique : true
    },
    value: {
    type: Number,
    required: true,
  },
   minAmount: {
    type: Number,
    default: 0,
  },
    maxAmount: {
    type: Number,
  },
  shop :{
    type :Object,
    required : true
  },
  selectedProducts:{
    type:String
  },

    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);