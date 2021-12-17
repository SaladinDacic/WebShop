var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
        productName:String,
        category:
        {
          type: String,
          enum: [
            "fruit", "vegetable", "dairy", "meat", 
            "vehicle", "console", "game", "house", 
            "apartment", "smartphone", "pc",
            "work", "productivity", "pool", "tools",
            "forHouse"
          ]
        }
})

const product = mongoose.model("product", productSchema)

module.exports = product;