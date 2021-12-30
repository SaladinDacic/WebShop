const express = require('express');
const router = express.Router();
const db = require('../models');
const {pushProductToSeller, sellerUpdateProduct, getFullSellerList, getSeller, getMySeller, getProduct} = require("../controller/seller");
const {authenticationLogin, sellerRegister, createWebToken, authenticateToken, logOut} = require("../services/authentication");


// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{products: {productId:"61b8f18886d8e59adc39c263", productName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findByIdAndUpdate("61c1c1a935117df5ec4f36e1", {$pull:{products: {"productId": "61b9c14a3f10e1277b03bd4e"}}}).then(data=>data)


// db.seller.findOneAndUpdate({"products.productId":"61b9c73effd51531d10e8a11"}, {"$set":{"products.$.holds":200, "products.$.sold":100}}).then(data=>data)

//GET
router.get("/", getSeller)
router.get('/getSellers', getFullSellerList);
router.get("/getAuthUser", authenticateToken, (req,res)=>{
  try{
    res.json({name: req.user.name, sellerId:req.user.id})
  }catch(err){
    res.status(404).send("Please login first")
  }
});
router.get('/getProduct/:sellerId/:productId', getProduct);
router.get("/:id",authenticateToken, getMySeller)


//POST
router.post("/register", sellerRegister, (req,res)=>{
  res.json({successfullyRegiser:true}).then(data=>data).catch(err=>res.send("failed to register", err))
})
router.post("/login", authenticationLogin, createWebToken)
router.post("/addproduct", authenticateToken, pushProductToSeller)

//PUT
router.put("/:id", sellerUpdateProduct)

//DELETE
router.get('/logOut', logOut);




module.exports = router;