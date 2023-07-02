import express from "express";
import http from "http"
import { Server } from "socket.io";

const port = 3050
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173'
    }
})

// defining route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// socket.io server connection
io.on('connection', (socket) => {
    console.log('user connected');

    // socket.io event handlers
    socket.on('chat_message', (message)=>{
        console.log('chat sent', message)

        // brodcasting to all users
        io.emit('chat_message', message)
    })
})
io.on('disconnection', (socket)=>{
    console.log('user disconnected')
})




io.listen(port, () => {
    console.log('server listening to port ', port)
})
