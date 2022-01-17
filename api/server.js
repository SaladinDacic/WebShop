const express = require ("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

const admin = require("./routes/admin")
const seller = require("./routes/seller")
const customer = require("./routes/customer")
const product = require("./routes/product");
const { Server } = require("http");



// ___________________________________________________________
// ____________________SOCKET.IO CONFIG_________________________
//socket.io config blueprint
const http = require('http').Server(app);
const io = require("socket.io")(http, {
  cors:{
    origin: ["http://localhost:3000"]
  }
});
// ____________________SOCKET.IO CONFIG_______________________
// _____________________________________________________________


//Midleware:
// ___________________________________________________________
// ___________________BASIC MIDDLEWARE________________________
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin:"http://localhost:3000" }))
// ___________________________________________________________
// ____________________SOCKET.IO LOGIC_________________________
io.on('connection', (socket) => {
  // console.log('a user connected');
  // console.log(socket.id)
  socket.on("join-room", (room)=>{
    socket.join(room)
    console.log("accept", socket.id)
  })
  socket.on("send-message", (messageData, room)=>{
    socket.broadcast.to(room).emit("get-message-fromRoom", messageData )
    console.log("došlo je do ovdje", room)
  })
});

// ___________________________________________________________
// _____________________ROUTES CONFIG_________________________
app.use("/api/admin", admin);
app.use("/api/seller", seller);
app.use("/api/customer", customer);
app.use("/api/product", product);

// ___________________________________________________________
// ______________________LISTEN PORT_________________________
http.listen(process.env.PORT || 3001  , ()=>{
  console.log("Server started!!");
})