const express = require('express');
const router = express.Router();
const db = require('../models');
const [admin,seller,customer, product] = require("./initial");
// db.admin.insertMany([admin]).then(data=>data);

// db.seller.create({
//   name:"Saladin",
//   email:"saladindacic@gmail.com",
//   intrested:["game", "pc", "tools"]
// }).then(data=>data);


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{products: {productId:"61b8f18886d8e59adc39c263", productName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findOneAndUpdate({"products.productId":"61b8f18886d8e59adc39c263"}, {"$set":{"products.$.holds":200}}).then(data=>data)



router.get('/', (req, res) => {
	db.customer.find().then(customer=>{res.json(customer)})
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