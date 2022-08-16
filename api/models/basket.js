var mongoose = require("mongoose");

var basketSchema = new mongoose.Schema({
        sellerId:{
          type: String,
          required: "SellerId cannot be blank!"},
        customerId:{
          type: String,
          required: "CustomerId cannot be blank!"
        },
        productId:{
          type: String,
          required: "ProductId cannot be blank!"
        },
        date:{
          type:Date,
          default: () => Date.now()
        },
        shipping:{
          type: String,
          enum:["home", "sent","traveling", "arrived"],
          default: "home"
        },
        accepted:{type: Boolean, default: false},
        pieces:{
          type: Number,
          default: 1
        }
        

        
})

const basket = mongoose.model("basket", basketSchema)

module.exports = basket;