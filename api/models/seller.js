var mongoose = require("mongoose");

var sellerSchema = new mongoose.Schema({
    name:{
      type: String,
      unique: true,
      required: "Name cannot be blank!"
    },
    email:{
      type: String,
      unique: true,
      required: "Email cannot be blank!"
    },
    password:{
      type: String,
      required: "Password cannot be blank!"
    },
    rating: {
      type: Number,
      default: 0,
      maximum : 5
    },
    date:{
      type:Date,
      default: () => Date.now()
    },
    likes:[String],
    sells:[String],
    products:[{ 
      date:{
        type:Date,
        default: () => Date.now()
      },
      sellOrDemand:{
        type: String,
        enum:["sell", "demand"]
      },
      job:String,
      service:String,
      productName:String,
      category:{
        type: String,
        enum: [
          "fruit", "vegetable", "dairy", "meat", 
          "vehicle", "console", "game", "house", 
          "apartment", "smartphone", "pc",
          "work", "productivity", "pool", "tools",
          "forHouse"
        ]
      },
      price: Number,
      desc: String,
      imgSrc:[String],
      brand: String,
      make:String,
      model: String,
      year:Number,
      locationName:String,
      kilometers:Number,
      used:{type: Boolean, default: false},
      sellOrRent:{
        type: String,
        enum:["sell", "rent"]
      },
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