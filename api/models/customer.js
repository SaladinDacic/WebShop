var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
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
    wishList:[{
      articleId:String,
      articleName:String,
    }],
    intrested:[String]
})

const customer = mongoose.model("customer", customerSchema)

module.exports = customer;