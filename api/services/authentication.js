require("dotenv").config();
const db = require('../models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createWebToken= async (req, res, next)=>{
  const {username, password} = req.body
  const user = {name: username, password: password}
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  console.log(`welcome ${username}`)
  res.cookie("loggedUser", accessToken, {maxAge: 7200000, sameSite: "lax", httpOnly: true, secure: false})
  res.json({accessToken:accessToken})
  next();
};
const authenticateToken= async (req, res, next)=>{
  const {loggedUser} = req.cookies
    jwt.verify(loggedUser, process.env.ACCESS_TOKEN_SECRET, async (err, user)=>{
        let response = await db.seller.findOne({name:user.name})
        user.id = response._id
        req.user = user;
        access = true;
        next()
      }).then(data=>{next()}).catch(err=>{ next()})
}
  
const logOut = (req, res, next)=>{
  res.clearCookie('loggedUser');
    res.send('Cookie cleared');
}

const sellerRegister = async (req, res, next) =>{
  try{
    const {username, password, email} = req.body
    // const salt = await bcrypt.genSalt() //može se zamjeniti samo sa brojem 10 u hash funkciji
    const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await db.seller.create({
        name:username,
        email:email,
        password:hashedPassword,
        products:[]
      }).then(data=>data).catch(err=>{throw new Error(err)})
      res.json(newUser);
      next();
  }catch(err){res.status(500).send()}
}


const authenticationLogin = async (req, res, next) =>{
  try{
    const {username, password} = req.body

    const adminUser = await db.admin.findOne({name:username}).then(data=>data).catch(err=>{throw new Error(err)})
    const sellerUser = await db.seller.findOne({name:username}).then(data=>data).catch(err=>{throw new Error(err)})
    const customerUser = await db.customer.findOne({name:username}).then(data=>data).catch(err=>{throw new Error(err)})
    
    const uncrypt= async (user)=>{ 
      await bcrypt.compare(password, user.password, (err, truthy)=>{
        if(err){
          throw new Error(err)
        }else if(truthy){
          // res.send("Successfuly logged in")
          next();
        }else if(!truthy){
          // throw new Error("not allowed")
          res.status(405).send("not allowed")
        }
      })
    }
    if(adminUser !== null){
      uncrypt(adminUser)
    }else if(sellerUser !== null){
      uncrypt(sellerUser)
    }else if(customerUser !== null){
      uncrypt(customerUser)
    }else{
      throw new Error("not allowed")
    }
    
  }catch(err){res.status(405).send("Not Allowed") }
  // next()
}


module.exports = {authenticationLogin, sellerRegister, createWebToken, authenticateToken, logOut};

  

/* const authenticationRegister = async (req, res, next) =>{
  try{
    const {username, password, email, who} = req.body
    // const salt = await bcrypt.genSalt() //može se zamjeniti samo sa brojem 10 u hash funkciji
    const hashedPassword = await bcrypt.hash(password, 10)
    // const user = {username, email, password: hashedPassword}
    if(who === "seller"){
      const newUser = await db.seller.create({
        name:username,
        email:email,
        password:hashedPassword,
        products:[]
      }).then(data=>data).catch(err=>{throw new Error(err)})
      res.json(newUser);
      next();
    }else if(who === "customer"){
      const newUser = await db.seller.create({
        name:username,
        email:email,
        password:hashedPassword,
        intrested:[]
      }).then(data=>data).catch(err=>{throw new Error(err)})
      res.json(newUser);
      next();
    }else{
      throw new Error("are you customer or seller, please input valid information")
    }
    
  }catch(err){res.status(500).send()}
} */

/* const customerRegister = async (req, res, next) =>{
  try{
    const {username, password, email} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db.seller.create({
      name:username,
      email:email,
      password:hashedPassword,
      intrested:[]
    }).then(data=>data).catch(err=>{throw new Error(err)})
    res.json(newUser);
    next();
  }catch(err){res.status(500).send()}
} */