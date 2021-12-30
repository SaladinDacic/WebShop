const express = require ("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

const admin = require("./routes/admin")
const seller = require("./routes/seller")
const customer = require("./routes/customer")
const product = require("./routes/product");

//Midleware:
// const crospass = require("./services/crospass")

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin:"http://localhost:3000" }))


app.use("/api/admin", admin);
app.use("/api/seller", seller);
app.use("/api/customer", customer);
app.use("/api/product", product);


app.listen(process.env.PORT || 3001  , ()=>{
  console.log("Server started!!");
})