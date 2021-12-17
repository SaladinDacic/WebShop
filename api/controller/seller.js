const db = require('../models');

const pushProductToSeller = async (req, res, next) =>{
  let {sellerId, productId, holds, sold} = req.body
  try{
    let product = await db.product.findById(productId)
    let {productName, category} = product
    let sellerObj = await db.seller.findByIdAndUpdate(sellerId, {$push:{products: {productName, category, holds, sold}}})
    res.json(sellerObj)
  }catch(err){console.log(err)}
  try{
    let data = await db.seller.findOne({_id: sellerId})
    await db.seller.findByIdAndUpdate(sellerId, {products: unique(data.products, "productName")})
  }catch(err){console.log(err)}
  next();
}

const sellerUpdateProduct = async (req, res, next) =>{
  let {sellerId, productId, holds, sold} = req.body
  await db.seller.findOneAndUpdate({id: sellerId,"products.productId":productId}, {"$set":{"products.$.holds":holds, "products.$.sold":sold}})
  // console.log(sellerId, productId, holds, sold)
  next();
}


module.exports = [pushProductToSeller, sellerUpdateProduct];


function unique(arrOfObj, prop){
  let newArr = [];
  arrOfObj.forEach(val=>{
      if(undefined === newArr.find(value=>JSON.stringify(value[prop])===JSON.stringify(val[prop]))){
          newArr.push(val);
      }
  })
  return newArr
}