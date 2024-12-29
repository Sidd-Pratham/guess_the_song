const express = require('express');
const app=express();

const dotenv=require("dotenv");
dotenv.config();

const cors=require("cors");
app.use(cors({
     origin: process.env.FE_URL 
 }))

const http=require("http")
const server = http.createServer(app);

const { Server } = require('socket.io');
const io=new Server(server, {
     cors: {
         origin: process.env.FE_URL, 
         methods: ['GET', 'POST'] 
     }
 });
app.get("/",(req,res)=>{
     res.send("Let's get grooving....!")
});

io.on("connection",(socket)=>{
     console.log("New WebSocket connection made successfully");
     socket.emit('welcome')
     socket.broadcast.emit('new-user')
     // socket.on('clicked',()=>{
     //      console.log("Button has been clicked");
     //      io.emit("click-rev")
     // })
     socket.on('audio-stream', (data) => {
          socket.broadcast.emit('receive-audio', data);
        });
      
     socket.on('start-stream', () => {
          console.log('User started streaming');
        });

     socket.on('stop-stream', () => {
          console.log('User stopped streaming');
        });    
        
     socket.on('disconnect', () => {
          console.log('A user disconnected');
        });

     // socket.on('offer', (data) => {
     //      socket.to(data.target).emit('offer', data);
     //  });
  
     //  socket.on('answer', (data) => {
     //      socket.to(data.target).emit('answer', data);
     //  });
  
     //  socket.on('ice-candidate', (data) => {
     //      socket.to(data.target).emit('ice-candidate', data);
     //  });
     socket.on('audio-stream', (audioData) => {
          console.log('Received audio data from user');
          
          // Broadcast the audio stream to all other connected users
          socket.broadcast.emit('audio-stream', audioData);
      });
})

const port=process.env.PORT;
server.listen(port,()=>{
     console.log(`Server is playing on port:${port}`)
})