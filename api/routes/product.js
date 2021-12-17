const express = require('express');
const router = express.Router();
const db = require('../models');
const [admin,seller,customer, product] = require("./initial");
// db.product.insertMany([
//   {productName:"jogurt",
//   category:"dairy"}
// ]).then(data=>{console.log(data); return data});
// db.seller.insertMany([seller]).then(data=>data);


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{products: {productId:"61b8f18886d8e59adc39c263", productName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"products.productId":"61b8f18886d8e59adc39c263"}, {"$set":{"products.$.holds":200}}).then(data=>data)

// db.product.findByIdAndDelete("61b9f76167857a3ea02aaf4d").then(data=>data)


router.get('/', (req, res) => {
	db.product.find().then(product=>{res.json(product)})
});

router.get("/:id", (req, res)=>{
  res.send(req.body)
})

router.post('/', (req, res) => {
  res.send(req.body)
});

router.put('/:id', (req, res) => {
  res.send(req.body)
});

router.delete('/:id', (req, res) => {
  res.send(req.body)
});

/* enum: [
  "fruit", "vegetable", "dairy", "meat", 
  "vehicle", "console", "game", "house", 
  "apartment", "smartphone", "pc",
  "work", "productivity", "pool", "tools",
  "forHouse"
] */



module.exports = router;