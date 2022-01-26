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
    var foundCustomer = await db.seller.findOne({name}).then(data=>{/* console.log(data); */ return data}).catch(err=>{throw new Error(err)});
    var customerId = foundCustomer._id
    
  }catch(err){
    res.send("not allowed")
    return
  }
  if(customerId !== undefined){
    if(customerId !== sellerId){
     try{
      let response = await db.basket.find({sellerId:sellerId, customerId:customerId, productId:productId}).then(data=>{ return data}).catch(err=>{throw new Error("Can't fetch any data")});
      if(response.length !== 0){
        console.log(response.length, "cant add more item, item is alread in base")
        throw new Error("item is already sent")
        // return
      }else{
        await db.basket.insertMany([
                {sellerId:sellerId,
                customerId:customerId,
                productId:productId,
                pieces: pieces           }
              ]).then(data=>{console.log(data); return data}).catch(err=>{throw new Error("Try to log in then to add items to cart")});
      }
     }catch(err){
        console.log("___________________________laalalalallala______________________________")
        throw new Error (err)
      }
    }else{
      res.send("You are not loggedIn or you are trying to buy from yourself")
      return
    }
  }

}
const acceptProductSell = async (req, res)=>{
  let {sellerId, productId} = req.body
  // console.log(sellerId, productId, req.user.name)
  try{
    var {name} = req.user
    if(name === undefined){
      res.send("please log in 1")
      return
    }
    await db.seller.findOne({name:name}).then(data=>{
      if(data._id!= sellerId){
        console.log("___________________________________________________________________________")
        console.log(data._id, sellerId)
        console.log("___________________________________________________________________________")
        res.send("not allowed 1 ")
        return
      }
      return data
    }).catch(err=>{throw new Error(err)});

    await db.basket.findOne({productId:productId}).then(data=>{
      if(data.sellerId!= sellerId){
        console.log("___________________________________________________________________________")
        console.log(data.sellerId, sellerId)
        console.log("___________________________________________________________________________")
        res.send("not allowed 2 ")
        return
      }
      return data
    }).catch(err=>{throw new Error(err)});
    
  }catch(err){
    res.send("please log in 2")
    return
  }
    if(sellerId !== undefined){
      try{
          await db.basket.findOneAndUpdate(
            {productId: productId}, {accepted:true}
          ).then(data=>{ return data}).catch(err=>{throw new Error(err)});
      }catch(err){
        res.send("There is no item with this Id")
        return
      }
    }else{
      res.send("You are not loggedIn")
      return
    }
  

}
const unAcceptProductSell = async (req, res)=>{
  let {sellerId, productId} = req.body
  try{
    var {name} = req.user
    if(name === undefined){
      res.send("please log in 1")
      return
    }
    await db.seller.findOne({name:name}).then(data=>{
      if(data._id!= sellerId){
        console.log("___________________________________________________________________________")
        console.log(data._id, sellerId)
        console.log("___________________________________________________________________________")
        res.send("not allowed 1 ")
        return
      }
      return data
    }).catch(err=>{throw new Error(err)});

    await db.basket.findOne({productId:productId}).then(data=>{
      if(data.sellerId!= sellerId){
        console.log("___________________________________________________________________________")
        console.log(data.sellerId, sellerId)
        console.log("___________________________________________________________________________")
        res.send("not allowed 2 ")
        return
      }
      return data
    }).catch(err=>{throw new Error(err)});
    
  }catch(err){
    res.send("please log in 2")
    return
  }
    if(sellerId !== undefined){
      try{
          await db.basket.findOneAndUpdate(
            {productId: productId}, {accepted:false}
          ).then(data=>{ return data}).catch(err=>{throw new Error(err)});
      }catch(err){
        res.send("There is no item with this Id")
        return
      }
    }else{
      res.send("You are not loggedIn")
      return
    }
  

}
const updateProductShipping = async (req, res)=>{
  let {sellerId, productId, shipping} = req.body
  try{
    var {name} = req.user
    if(name === undefined){
      res.send("please log in 1")
      // return
    }
    await db.seller.findOne({name:name}).then(data=>{
      if(data._id!= sellerId){
        console.log("________________11111111111111111111111111111111111_______________________")
        console.log(data._id, sellerId)
        console.log("___________________________________________________________________________")
        res.send("not allowed 1 ")
        // return
      }

    }).catch(err=>{console.log(err)});

    await db.basket.findOne({productId:productId}).then(data=>{
      if(data.sellerId!= sellerId){
        console.log("__________________2222222222222222222222222222_______________________________")
        console.log(data.sellerId, sellerId)
        console.log("___________________________________________________________________________")
        res.send("not allowed 2 ")
        return
      }
    }).catch(err=>{console.log(err)});
    
  }catch(err){
    console.log("__________________333333333333333333333333333333_______________________________")
        console.log("___________________________________________________________________________")
    res.send("please log in 2")
    // return
  }
  
      try{
          let response = await db.basket.findOneAndUpdate(
            {productId: productId}, {shipping:shipping}
          ).then(data=>{ return data}).catch(err=>{console.log(err)});
          // console.log("__________________44444444444444444444444444_______________________________")
          // console.log("___________________________________________________________________________")
          res.json(response)
          // return
      }catch(err){
        // console.log("__________________555555555555555555555555_______________________________")
        // console.log("___________________________________________________________________________")
      //   console.log(err)
        // res.send("There is no item with this Id")
        return
      }



}


module.exports = { updateProductShipping, unAcceptProductSell, acceptProductSell, getProductsOfSeller,getProductsOfCustomer, addProductToBasket}


function unique(arrOfObj, prop) {
  let newArr = [];
  arrOfObj.forEach((val) => {
    if (
      undefined ===
      newArr.find(
        (value) =>
          JSON.stringify(value[prop]) === JSON.stringify(val[prop])
      )
    ) {
      newArr.push(val);
    }
  });
  return newArr;
}