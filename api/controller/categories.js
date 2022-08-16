const db = require('../models');

const addProductCategories = async (req, res)=>{
  let {productCategoriesArr} = req.body
  if(typeof(productCategoriesArr)!=="string"){

    try{
      let createArrOfObj = productCategoriesArr.map(str=>{
        return {productCategories: str}
      })
        console.log(createArrOfObj)
        await db.categories.insertMany(createArrOfObj)
        res.json(createArrOfObj)
    }catch(err){res.send("duplicate category")}
  }else{
    try{
      await db.categories.insertMany([{productCategories:productCategoriesArr}])
      console.log(productCategoriesArr)
      res.json(productCategoriesArr)
    }catch(err){res.send("duplicate category")}
  }
}




module.exports = {addProductCategories}

