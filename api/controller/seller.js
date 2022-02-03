const { parse } = require('dotenv');
const db = require('../models');

const getSeller = async (req,res,next)=>{
  try{
    let sellerData = await db.seller.find({}).then(data=>data).catch(err=>{throw new Error(err)})
    res.json(sellerData)
    next()
  }catch(err){
    res.send("cant fetch any data", err)
    next()
  }
}
const getSellerById = async (req,res,next)=>{
  let {id} = req.params
  try{
    let sellerData = await db.seller.findById(id).then(data=>data).catch(err=>{throw new Error(err)})
    res.json(sellerData)
    // next()
  }catch(err){
    res.status(404).json({data:{name:""}})
    // next()
  }
}
const deleteSellerById = async (req,res,next)=>{
  let {id} = req.params
  try{
    let sellerData = await db.seller.findByIdAndDelete(id).then(data=>data).catch(err=>{throw new Error(err)})
    res.json(sellerData)
    // next()
  }catch(err){
    res.status(404).send("not found")
    // next()
  }
}

const getMySeller = async (req, res, next)=>{

  let {id} = req.params;
  try{
    let sellerData = await db.seller.findOne({"_id":id}).then(data=>data).catch(err=>{throw new Error(err)})
    if(sellerData.name === req.user.name){
      res.json(sellerData)
      next()
    }else throw new Error("User is not logged in")
  }catch(err){
    res.status(404)/* .send("cant fetch data") */
    next()
  }
}
const updateSellerData = async (req, res, next)=>{

  let {sellerId} = req.params;
  let obj = req.body;
  try{
    let sellerData = await db.seller.findOne({"_id":sellerId}).then(data=>data).catch(err=>{throw new Error(err)})
    console.log(sellerData.name)

    if(sellerData.name === req.user.name){
      let updateSellerData = await db.seller.findByIdAndUpdate(sellerId, obj).then(data=>data).catch(err=>{throw new Error(err)})
      res.json(updateSellerData)
      next()
    }else throw new Error("User is not logged in")
  }catch(err){
    res.status(404)/* .send("cant fetch data") */
    next()
  }
}


const getProduct = async( req, res, next)=>{
  try{
    let {sellerId, productId} = req.params;
    let sellerData = await db.seller.findById(sellerId).then(data=>data)
    let product = sellerData.products.find(obj=>obj._id==productId)
    console.log(product)
    res.json(product)
    next()
  }catch(err){
    res.status(404).send("cant fetch any data")
    next()
  }
}

const getFullSellerList = async (req, res, next)=>{
  try{
    let sellerData = await db.seller.find({}).then(data=>data)
    sellerData = sellerData.map(seller=>{
      return {sellerId: seller._id, name: seller.name, rating: seller.rating, products:seller.products.map(product=>{
        return {
          productName:product.productName, 
          category:product.category,
          holds:product.holds, 
          used:product.used, 
          sellOrRent:product.sellOrRent, 
          sellOrDemand:product.sellOrDemand, 
          job:product.job, 
          service:product.service, 
          year:product.year, 
          locationName:product.locationName, 
          make:product.make, 
          model:product.model, 
          kilometers:product.kilometers, 
          sold:product.sold, 
          price:product.price, 
          brand:product.brand, 
          imgSrc:product.imgSrc,
          desc:product.desc,
          date:product.date,
          productId:product._id
        }
      })}
    })
    res.json({seller:sellerData})
    next();
  }catch(err){
    res.status(404).send("cant fetch any data")
    next()
  }
}


const pushProductToSeller = async (req, res, next) =>{
  var {productName, category, sellOrDemand, job, service, year, locationName, make, model, kilometers, used, sellOrRent, holds, sold, price, brand, imgSrc, desc} = req.body
  var {name} = req.user
  let foundSeller = await db.seller.findOne({name})
  let sellerId = foundSeller._id

  if(imgSrc===undefined | imgSrc.lengt===0){var imgSrc = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png",
  ]}
  try{
    let sellerObj = await db.seller.findByIdAndUpdate(sellerId, {$push:{products: {productName, category, sellOrDemand, job, service, year, locationName, make, model, kilometers, used, sellOrRent, holds, sold, price, brand, imgSrc, desc}}})
    res.json(sellerObj)
  }catch(err){res.status(404)}
  try{
    let data = await db.seller.findById(sellerId)
    let newData = await db.seller.findByIdAndUpdate(sellerId, {products: unique(data.products, "productName")}, {returnOriginal: false}).then(data=>data)

  }catch(err){res.status(404)}
}

const sellerUpdateProduct = async (req, res, next) =>{

  var {sellerId, productId, productName, category, sellOrDemand, job, service, year, locationName, make, model, kilometers, used, sellOrRent, holds, sold, price, brand, imgSrc, desc} = req.body
  try{
    let data = await db.seller.findOne({id: sellerId,"products._id":productId}).then(data=>data).catch(err=>{throw new Error(err)})
    var productId; var productName; var category; var sellOrDemand; var job; var service;var year;var  locationName;var  make;var model;var kilometers;var used;var sellOrRent;var holds;var sold;var price;var brand;var imgSrc;var desc;var date;
    let checkArr = [productId, productName, category, sellOrDemand, job, service, year, locationName, make, model, kilometers, used, sellOrRent, holds, sold, price, brand, imgSrc, desc, date];
    let checkObj = {productId, productName, category, sellOrDemand, job, service, year, locationName, make, model, kilometers, used, sellOrRent, holds, sold, price, brand, imgSrc, desc, date};
    for(let i = 0; i<checkArr.length; i++){
      checkProperty(checkArr[i], Object.keys(checkObj)[i], data, productId);
    }
    let printData = await db.seller.findOneAndUpdate({id: sellerId,"products._id":productId}, {"$set":
    {
      "products.$.holds":holds, 
      "products.$.used":used, 
      "products.$.sellOrRent":sellOrRent, 
      "products.$.productName":productName, 
      "products.$.sellOrDemand":sellOrDemand, 
      "products.$.job":job, 
      "products.$.service":service, 
      "products.$.year":year, 
      "products.$.locationName":locationName, 
      "products.$.make":make, 
      "products.$.model":model, 
      "products.$.kilometers":kilometers, 
      "products.$.sold":sold, 
      "products.$.price":price, 
      "products.$.brand":brand, 
      "products.$.category":category,
      "products.$.imgSrc":imgSrc,
      "products.$.desc":desc,
      "products.$.date":date
    }},{ returnOriginal: false }).then(data=>data)
    res.json(printData)
    // next();
  }catch(err){
    res.status(404).send("not found")
  }
}

const deleteProduct = async (req, res, next)=>{
  const {sellerId, productId} = req.body
  try{
    let data = await db.seller.findByIdAndUpdate(sellerId, {$pull:{products: {"_id": productId}}}).then(data=>data);
    res.json(data)
  }catch(err){
    res.status(404).send("not found")
  }
}
    
module.exports = {updateSellerData, deleteSellerById, getSellerById, getProduct, getMySeller, getSeller, pushProductToSeller, sellerUpdateProduct, getFullSellerList, deleteProduct};
    
    
    function unique(arrOfObj, prop){
  let newArr = [];
  arrOfObj.forEach(val=>{
      if(undefined === newArr.find(value=>JSON.stringify(value[prop])===JSON.stringify(val[prop]))){
        newArr.push(val);
      }
    })
    return newArr
  }
  
  function checkProperty(prop,propName, data, productId){
    if(prop===undefined){
      var prop=data.products.find(obj=>{
        return obj["_id"] == productId
    })[propName]
  }
  console.log(propName, prop)
  return prop
}


  // console.log(checkArr)
 /*  if(holds===undefined){var {holds}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(used===undefined){var {used}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(sellOrRent===undefined){var {sellOrRent}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(productName===undefined){var {productName}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(sellOrDemand===undefined){var {sellOrDemand}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(job===undefined){var {job}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(service===undefined){var {service}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(year===undefined){var {year}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(locationName===undefined){var {locationName}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(make===undefined){var {make}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(model===undefined){var {model}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(kilometers===undefined){var {kilometers}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(sold===undefined){var {sold}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(price===undefined){var {price}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(brand===undefined){var {brand}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(category===undefined){var {category}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(imgSrc===undefined){var {imgSrc}=data.products.find(obj=>{
    return obj["_id"] == productId
})}
  if(desc===undefined){var {desc}=data.products.find(obj=>{
    return obj["_id"] == productId
})} */
