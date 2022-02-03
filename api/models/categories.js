var mongoose = require("mongoose");

var categoriesSchema = new mongoose.Schema({
    productCategories:{
      type:String,
      // required:true,
      unique: true
    },
    shopCategories:{
      type:String,
      // required:true,
      unique: true
    },
})

const categories = mongoose.model("categories", categoriesSchema)

module.exports = categories;