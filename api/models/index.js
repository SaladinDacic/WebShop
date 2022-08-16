const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.connect('mongodb://localhost:27017/webshop', {useNewUrlParser: true,   
   useUnifiedTopology: true})
    .then(()=>{
        console.log("connected successfuly :D")
    })
    .catch(err=>{
        console.log("cant connect", err)
    })


mongoose.Promise = Promise;
module.exports.admin = require("./admin");
module.exports.seller = require("./seller");
module.exports.popular = require("./popular");

module.exports.basket = require("./basket");
module.exports.ratingSeller = require("./ratingSeller");
module.exports.categories = require("./categories");