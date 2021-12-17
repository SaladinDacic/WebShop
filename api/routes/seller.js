const express = require('express');
const router = express.Router();
const db = require('../models');
const [admin,seller,customer, product] = require("./initial");
const [pushProductToSeller, sellerUpdateProduct] = require("../controller/seller");

// db.seller.create({name:"Merkator",
// email:"merkatorshops@gmail.com",
// products:[]}).then(data=>data).catch(data=>data);


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{products: {productId:"61b8f18886d8e59adc39c263", productName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findByIdAndUpdate("61b9cb988d1ed1860a491135", {$pull:{products: {"_id":"61b9f9f50a474aa081dbf13b"}}}).then(data=>data)


// db.seller.findOneAndUpdate({"products.productId":"61b9c73effd51531d10e8a11"}, {"$set":{"products.$.holds":200, "products.$.sold":100}}).then(data=>data)

// db.seller.findOneAndDelete({}).then(data=>data)


router.get('/', (req, res) => {
	db.seller.find().then(seller=>{res.json(seller)})
});

router.post("/addproduct", pushProductToSeller)
router.post("/updateproduct", sellerUpdateProduct)

router.post('/', (req, res) => {
  res.send(req.body)
});

router.put('/:id', (req, res) => {
  res.send(req.body)
});

router.delete('/:id', (req, res) => {
  res.send(req.body)
});




module.exports = router;