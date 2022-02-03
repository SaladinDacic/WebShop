const express = require ("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");/* required for multer */
const path = require("path");/* required for multer */
const fs = require("fs")

const admin = require("./routes/admin")
const seller = require("./routes/seller")
const popular = require("./routes/popular")
const basket = require("./routes/basket");
const ratingSeller = require("./routes/ratingSeller");


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
app.use("/api/images/",express.static('./images')) 
//pravi path za sve fileove iz foldera images da budu accessable u route /localhost:3001/api/images/${imeFilea}
app.use(cors({ credentials: true, origin:"http://localhost:3000" }))
// ___________________________________________________________
// ____________________SOCKET.IO LOGIC_________________________
io.on('connection', (socket) => {
  // console.log('a user connected');
  // console.log(socket.id)
  socket.on("join-room", (room)=>{
    socket.join(room)
    console.log("joined in ", room)
    console.log("accept", socket.id)
  })
  socket.on("send-message", (messageData, room)=>{
    socket.to(room).emit("get-message-fromRoom", messageData )
    console.log("universal chat mode", room)
  })
});

// ___________________________________________________________
// _____________________ROUTES CONFIG_________________________
app.use("/api/admin", admin);
app.use("/api/seller", seller);
app.use("/api/popular", popular);
app.use("/api/basket", basket);
app.use("/api/ratingSeller", ratingSeller);


// ___________________________________________________________
// __________________Multer file uploader_____________________
// const storage = multer.diskStorage({
//   destination: (req, file, cb/* callback */)=>{
//     cb(null/* briga nas za error */, "./images"/* path gdje da se storaju slike */)
//   },
//   /* određujemo filename, kako ne bi bili orginalni nazivi slika jer se mogu ponavljati */
//   /* obično najbolji način za ime je datum i vrijeme kao ime */
//   filename:(req, file, cb)=>{
//     console.log(file)
//     cb(null, Date.now()+ path.extname(file.originalname)/* spojili datum sa imenom filea */)
//   }
// })
// const upload = multer({storage:storage})

const upload = multer({ dest: 'images/' })
app.post("/api/upload", upload.array("files"), (req, res)=>{
  let arrOfLinks = []
  req.files.forEach((file, i)=>{
    let fileType = file.mimetype.split("/")[1];
    let newFileName = Date.now()+ file.originalname.split(".")[0] + "." + fileType;
    arrOfLinks.push(`http://localhost:3001/api/images/${newFileName}`)
    fs.rename(`./images/${file.filename}`, `./images/${newFileName}`, (req, res)=>{
        console.log("done");
      })
      console.log(fileType)
    })
    console.log(req.body.files)
    console.log(req.files)
  res.json({arr:arrOfLinks});
})
app.post("/api/images/deletion", (req,res)=>{
  let {arrayOfLinks} = req.body;
  arrayOfLinks = arrayOfLinks.map(str=>{
    return "./" + str.split("api/")[1]
  })
  arrayOfLinks.forEach(imgPath=>{
    try{
      fs.unlink(imgPath, (err)=>{
        console.log('${imgPath} was deleted');
      })
    }catch(err){

    }
  })
  // console.log(arrayOfLinks)
  res.json({deletedFiles:arrayOfLinks})
})
// ___________________________________________________________
// ______________________LISTEN PORT_________________________
http.listen(process.env.PORT || 3001  , ()=>{
  console.log("Server started!!");
})