const express = require ("express");
const app = express();
const admin = require("./routes/admin")
const seller = require("./routes/seller")
const customer = require("./routes/customer")
const product = require("./routes/product");

//Midleware:
const crospass = require("./services/crospass")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/admin",crospass, admin);
app.use("/api/seller",crospass, seller);
app.use("/api/customer",crospass, customer);
app.use("/api/product",crospass, product);


app.listen(process.env.PORT || 3001  , ()=>{
  console.log("Server started!!");
})