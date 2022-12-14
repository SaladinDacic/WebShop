const express = require('express');
const router = express.Router();
const db = require('../models');
const {increasePopularity} = require("../controller/popular");
// db.admin.insertMany([admin]).then(data=>data);

// db.popular.create({
//   category:"game",
// }).then(data=>data);

// db.popular.findByIdAndDelete("61f1b32bbdf10e9057856a27").then(data=>data);

// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{products: {productId:"61b8f18886d8e59adc39c263", productName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"products.productId":"61b8f18886d8e59adc39c263"}, {"$set":{"products.$.holds":200}}).then(data=>data)



router.get('/', (req, res) => {
	db.popular.find().then(popular=>{res.json(popular)})
});

router.post('/increasePopularity', increasePopularity);

router.put('/:id', (req, res) => {
  res.send(req.body)
});

router.delete('/:id', (req, res) => {
  res.send(req.body)
});




module.exports = router;