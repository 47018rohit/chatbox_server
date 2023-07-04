import express from "express";
import http from "http"
import { Server } from "socket.io";

const port = 3050
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

// defining route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// socket.io server connection
io.on('connection', (socket) => {
    console.log(`user: ${socket.id} connected `);

    socket.on('join_room', data => {
        socket.join(data)
    })
    socket.on('send_message', data => {
        socket.to(data.room).emit("recieve_message", data.message)
    })
})


io.on('disconnection', (socket) => {
    console.log('user disconnected')
})




server.listen(port, () => {
    console.log('server listening to port ', port)
})
