var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    name:{
      type: String,
      required: "Name cannot be blank!"
    },
    email:{
      type: String,
      required: "Email cannot be blank!"
    },
    block:[{
        userId:
        {type: String}
    }],
    archive:[{
      userId:
      {type: String}
    }]
})

const admin = mongoose.model("admin", adminSchema)



module.exports = admin;