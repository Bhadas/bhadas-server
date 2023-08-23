const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const authRouter = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute.js");
const commentRoutes = require("./routes/commentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

dbConnect();
 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());

const corsOptions = {
    origin: '*', 
  };
  
app.use(cors(corsOptions));

app.use("/api/user", authRouter)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);




const server = app.listen(PORT,console.log(`Server running on PORT ${PORT}...`));


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
  