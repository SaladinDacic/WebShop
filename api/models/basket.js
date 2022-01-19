var mongoose = require("mongoose");

var basketSchema = new mongoose.Schema({
        sellerId:{
          type: String,
          unique: true,
          required: "Name cannot be blank!"},
        customerId:{
          type: String,
          unique: true,
          required: "Name cannot be blank!"
        },
        productId:{
          type: String,
          unique: true,
          required: "Name cannot be blank!"
        },
        date:{
          type:Date,
          default: () => Date.now()
        },
        shipping:{
          type: String,
          enum:["home", "sent", "arrived"],
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