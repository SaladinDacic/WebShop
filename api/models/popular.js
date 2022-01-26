var mongoose = require("mongoose");

var popularSchema = new mongoose.Schema({
    category:{
      type: String,
      required: "Must provide name",
      enum: [
        "Category",
        "fruit",
        "vegetable",
        "dairy",
        "meat",
        "vehicle",
        "console",
        "game",
        "house",
        "apartment",
        "smartphone",
        "pc",
        "work",
        "category",
        "pool",
        "tools",
        "forHouse",
      ]
    },
    value:{
      type: Number,
      required: "Must provide value",
      default: 1
    }
})

const popular = mongoose.model("popular", popularSchema)

module.exports = popular;