var mongoose = require("mongoose");

var sellerSchema = new mongoose.Schema({
    sellerId:{
      type: String,
      required: "Company Id cannot be blank!"
    },
    customerId:{
      type: String,
      required: "Customer Id cannot be blank!"
    },
    shippingActive:{
      type: Boolean,
      default: false
    }
})

const seller = mongoose.model("seller", sellerSchema)

module.exports = seller;