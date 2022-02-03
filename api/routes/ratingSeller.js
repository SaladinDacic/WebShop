const express = require('express');
const router = express.Router();
const db = require('../models');
const {getRatingOfSeller, addRatingToSeller} = require("../controller/ratingSeller.js");
const {authenticateToken} = require("../services/authentication");


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{ratingSellers: {ratingSellerId:"61b8f18886d8e59adc39c263", ratingSellerName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"ratingSellers.ratingSellerId":"61b8f18886d8e59adc39c263"}, {"$set":{"ratingSellers.$.holds":200}}).then(data=>data)

// db.ratingSeller.findByIdAndDelete("61f067ff40d17b2937fde857").then(data=>data)


router.get('/', (req, res) => {
	db.ratingSeller.find().then(ratingSeller=>{res.json(ratingSeller)})
});
router.get('/getRatingOfSeller/:sellerId', getRatingOfSeller);

// router.get("/customer/:customerId", getProductsOfCustomer)
// router.get("/seller/:sellerId", getProductsOfSeller)

router.post('/addRatingToSeller',authenticateToken, addRatingToSeller);


// router.delete('/:id', (req, res) => {
//   res.send(req.body)
// });




module.exports = router;