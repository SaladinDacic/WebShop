var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
    name:{
      type: String,
      required: "Name cannot be blank!"
    },
    email:{
      type: String,
      required: "Email cannot be blank!"
    },
    wishList:[{
      articleId:String,
      articleName:String,
    }],
    intrested:[String]
})

const customer = mongoose.model("customer", customerSchema)

module.exports = customer;