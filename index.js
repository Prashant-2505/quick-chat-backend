const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

server.listen(4000, () => { console.log("listening on *:4000"); });



//^ here socket.on*"connection) is default implementation that listen from clent to get ot know user is connected to server"

//* io is only used to make connection and dissconnection to send event use socket  not io

// Initialize users object to store user names by socket ID
const users = {};

io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);


 
    // listen creating room 
    socket.on('join room', (room) => {
        socket.join(room)
        console.log(`User ${socket.id} joined room ${room}`)
    })

    // Listen for leaving a room
    socket.on('leave room', (room) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
    });


    // listen for sendin message
    socket.on('send message', ({ room, message,senderName }) => {
        console.log(message)
        io.to(room).emit('new message', { message, senderId: socket.id ,senderName})
    })

});

