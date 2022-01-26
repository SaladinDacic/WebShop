const db = require('../models');

const increasePopularity = async (req, res)=>{
  let {category} = req.body
  if(category !== undefined){
    db.popular.find({}).then(async data=>{
      let arrOfObj = data;
      let found = pushPopular({category: category}, arrOfObj)
      console.log(found)
      if(found !== undefined){
        db.popular.findByIdAndUpdate(found._id, {value: found.value + 1}).then(data=>{
          res.send(data)
          return;
        }).catch(err=>{throw new Error(err)})
      }else{
        db.popular.create({category: category}).then(data=>{
          res.json(data)
          return;
        }).catch(err =>{throw new Error(err)
        } )
      }
    }).catch(err=>{throw new Error(err)
    })
  }else{
    res.send("please insert category")
    return
  }
}

module.exports = {increasePopularity }


function pushPopular(obj, arrOfObj){
  let newArrOfObj = arrOfObj;
  let key = Object.keys(obj)[0]
  let val = Object.values(obj)[0]
  let filteredArr = Object.values(newArrOfObj)
  // console.log(filteredArr)
  let found = filteredArr.find(objInArr=>{
        // console.log(Object.values(objInArr)[2].category, val)
      return Object.values(objInArr)[2].category ===  val
  })
  
  return found
}