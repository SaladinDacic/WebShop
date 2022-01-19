const express = require('express');
const router = express.Router();
const db = require('../models');

/* sellerId
customerId
productId
*/
// db.basket.insertMany([
//   {sellerId:"61c36f5c5d40e5a8d1abdeca",
//   customerId:"61e5a443b09123931f5a42e0",
//    productId:"61c9ec8166a4efd17fd0b09e",
//    pieces: 15            }
// ]).then(data=>{console.log(data); return data});


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{baskets: {basketId:"61b8f18886d8e59adc39c263", basketName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"baskets.basketId":"61b8f18886d8e59adc39c263"}, {"$set":{"baskets.$.holds":200}}).then(data=>data)

// db.basket.findByIdAndDelete("61b9f76167857a3ea02aaf4d").then(data=>data)


router.get('/', (req, res) => {
	db.basket.find().then(basket=>{res.json(basket)})
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




module.exports = router;