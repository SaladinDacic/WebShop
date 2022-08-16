const express = require('express');
const router = express.Router();
const db = require('../models');
const {addProductCategories} = require("../controller/categories.js");
const {authenticateToken} = require("../services/authentication");


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{categoriess: {categoriesId:"61b8f18886d8e59adc39c263", categoriesName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"categoriess.categoriesId":"61b8f18886d8e59adc39c263"}, {"$set":{"categoriess.$.holds":200}}).then(data=>data)

// db.categories.findByIdAndDelete("61f067ff40d17b2937fde857").then(data=>data)


router.get('/', (req, res) => {
	db.categories.find().then(categories=>{res.json(categories)})
});

router.post('/addProductCategories',authenticateToken, addProductCategories);




module.exports = router;