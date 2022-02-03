const db = require('../models');

const addRatingToSeller = async (req, res)=>{
  let {sellerId, rating} = req.body
  if(rating>5){
    res.send("invalid rating number");
    return;
  }
  try{
    var user = req.user;
    if(req.user === undefined){
      res.send("please log in");
      return
    }
    else if(req.user.id == sellerId){
      res.send("You can't vote yourself");
      return
    }
  }catch(err){
    res.send("please log in")
    return
  }
    db.ratingSeller.find()
    .then(async allRatings=>{
      let uniqueRatings = unique(allRatings, "sellerId", "customerId")
      if(uniqueRatings.length !== allRatings.length){
        await db.ratingSeller.deleteMany({})
        await db.ratingSeller.insertMany([...uniqueRatings])
      }else{
        let foundOne = allRatings.find(rating=>{
          return rating["sellerId"] == sellerId && rating["customerId"] == user.id
        })
        if(foundOne){
          console.log(rating)
          await db.ratingSeller.findOneAndUpdate({sellerId:sellerId, customerId:user.id}, {rating})
        }
      }
    })
    .catch(err=>{throw new Error(err)})
    res.json({sellerId, customerId:user.id, rating})
    
    // db.ratingSeller.create({sellerId, customerId:user.id, rating})
}

const getRatingOfSeller = async (req, res)=>{
  let {sellerId} = req.params
  db.ratingSeller.find({sellerId})
  .then(response=>{
    console.log(response)
    let sumOfRatings = response.map(ratingObj=>{
      return ratingObj.rating
    }).reduce((acc, val, i, arr)=>{
      return acc+val
  },0)

    // res.json(response)
    res.json({rating: sumOfRatings/response.length})
  })
  .catch(err=>{throw new Error(err)})
}



module.exports = {getRatingOfSeller, addRatingToSeller}


function unique(arrOfObj, prop1, prop2) {
  let newArr = [];
  arrOfObj.forEach((val) => {
    if (
      undefined ===
      newArr.find(
        (value) =>
          JSON.stringify(value[prop1]) === JSON.stringify(val[prop1]) &&
          JSON.stringify(value[prop2]) === JSON.stringify(val[prop2]) 
      )
    ) {
      newArr.push(val);
    }
  });
  return newArr;
}