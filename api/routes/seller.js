const express = require('express');
const router = express.Router();
const db = require('../models');
const {updateSellerData, deleteSellerById, getSellerById, deleteProduct,pushProductToSeller, sellerUpdateProduct, getFullSellerList, getSeller, getMySeller, getProduct} = require("../controller/seller");
const {authenticationLogin, sellerRegister, createWebToken, authenticateToken, logOut} = require("../services/authentication");


//GET
router.get("/", getSeller)
router.get('/getSellers', getFullSellerList);
router.get("/getAuthUser", authenticateToken, (req,res)=>{
  try{
    console.log(req.user.name, req.user.id)
    res.json({name: req.user.name, sellerId:req.user.id})
  }catch(err){res.json({data:false})}
});
router.get('/getProduct/:sellerId/:productId', getProduct);
router.get("/getSellerById/:id", getSellerById)
router.get("/:id",authenticateToken, getMySeller)
router.get('/logOut', logOut);


//POST
router.post("/register", sellerRegister, (req,res)=>{
  res.json({successfullyRegiser:true}).then(data=>data).catch(err=>res.send("failed to register", err))
})
router.post("/login", authenticationLogin, createWebToken)
router.post("/addproduct", authenticateToken, pushProductToSeller)


//PUT
router.put("/:id", sellerUpdateProduct)
router.put("/updateSellerData/:sellerId", authenticateToken, updateSellerData)

//DELETE
router.put("/", deleteProduct)
router.delete("/:id", deleteSellerById)




module.exports = router;




// db.seller.findByIdAndUpdate("61b8f1f9c40e19560da04f74", {$push:{products: {productId:"61b8f18886d8e59adc39c263", productName: "switch", holds: 100}}}).then(data=>data)
// db.seller.findByIdAndUpdate("61c1c1a935117df5ec4f36e1", {$pull:{products: {"productId": "61b9c14a3f10e1277b03bd4e"}}}).then(data=>data)


// db.seller.findOneAndUpdate({"products.productId":"61b9c73effd51531d10e8a11"}, {"$set":{"products.$.holds":200, "products.$.sold":100}}).then(data=>data)
