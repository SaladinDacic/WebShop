const express = require('express');
const router = express.Router();
const db = require('../models');
const {getProductsOfSeller, getProductsOfCustomer, addProductToBasket} = require("../controller/basket.js");
const {authenticateToken} = require("../services/authentication");


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{baskets: {basketId:"61b8f18886d8e59adc39c263", basketName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"baskets.basketId":"61b8f18886d8e59adc39c263"}, {"$set":{"baskets.$.holds":200}}).then(data=>data)

// db.basket.findByIdAndDelete("61e87dfb8809d1a9fbb2c398").then(data=>data)


router.get('/', (req, res) => {
	db.basket.find().then(basket=>{res.json(basket)})
});

router.get("/customer/:customerId", getProductsOfCustomer)
router.get("/seller/:sellerId", getProductsOfSeller)

router.post('/addProductToBasket',authenticateToken, addProductToBasket);

router.put('/:id', (req, res) => {
  res.send(req.body)
});

router.delete('/:id', (req, res) => {
  res.send(req.body)
});




module.exports = router;