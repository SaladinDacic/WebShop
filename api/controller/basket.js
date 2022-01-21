const db = require('../models');


const getProductsOfCustomer = async (req, res)=>{
  let {customerId} = req.params
  try{
    let response = await db.basket.find({customerId:customerId})
    if (response.length === 0){ res.send("no item avaliable"); return;}
    res.json(response)
  }catch(err){
    res.send(err)
  }

}
const getProductsOfSeller = async (req, res)=>{
  let {sellerId} = req.params
  try{
    let response = await db.basket.find({sellerId:sellerId})
    if (response.length === 0){ res.send("no item avaliable"); return;}
    res.json(response)
  }catch(err){
    res.send(err)
  }

}

const addProductToBasket = async (req, res)=>{
  let {sellerId, productId, pieces} = req.body
  try{
    var {name} = req.user
  }catch(err){
    res.send("please log in")
    return
  }
  var customerId;
  try{
    var foundCustomer = await db.seller.findOne({name}).then(data=>{console.log(data); return data}).catch(err=>{throw new Error(err)});
    var customerId = foundCustomer._id
    
  }catch(err){
    res.send("not allowed")
    return
  }
  if(customerId !== undefined){
    if(customerId !== sellerId){
     
      try{
          await db.basket.insertMany([
            {sellerId:sellerId,
            customerId:customerId,
            productId:productId,
            pieces: pieces           }
          ]).then(data=>{console.log(data); return data}).catch(err=>{throw new Error(err)});
      }catch(err){
        console.log("___________________________laalalalallala______________________________")
        throw new Error ("Try to log in then to add items to cart")
      }
    }else{
      res.send("You are not loggedIn or you are trying to buy from yourself")
      return
    }
  }

}


module.exports = {getProductsOfSeller,getProductsOfCustomer, addProductToBasket}