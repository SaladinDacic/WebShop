var mongoose = require("mongoose");

var ratingSellerSchema = new mongoose.Schema({
    sellerId:{
      type: String,
      required: "Must provide seller id",
    },
    customerId:{
      type: String,
      required: "Must provide seller id",
      // unique: true
    },
    rating:{
      type: Number,
      required: "Must provide rating",
    }
})

const ratingSeller = mongoose.model("ratingSeller", ratingSellerSchema)

module.exports = ratingSeller;