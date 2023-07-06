import express from "express";
import http from "http"
import { Server } from "socket.io";
import { onConnection, onDisconnection } from "./socket.js";
import userRouter from "./routes/userRoutes.js";


const port = 3050
const app = express()
const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

app.use(express.json())
app.use('/v1/api/user', userRouter)

// defining route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

io.on('connection', socket => onConnection(socket))
io.on('disconnection', socket => onDisconnection(socket))




server.listen(port, () => {
    console.log('server listening to port ', port)
})
