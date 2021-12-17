var mongoose = require("mongoose");

var sellerSchema = new mongoose.Schema({
    name:{
      type: String,
      required: "Name cannot be blank!"
    },
    email:{
      type: String,
      required: "Email cannot be blank!"
    },
    products:[{  
      productId:String,
      productName:String,
      category:String,
      holds:{
      type: Number,
      default: 0
      },
      sold:{
        type: Number,
        default: 0
      }
    }]
})

const seller = mongoose.model("seller", sellerSchema)

module.exports = seller;