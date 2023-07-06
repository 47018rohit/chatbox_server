
// socket.io server connection
export const onConnection= (socket) => {
    console.log(`user: ${socket.id} connected `);

    socket.on('join_room', data => {
        socket.join(data)
    })
    socket.on('send_message', data => {
        socket.to(data.room).emit("recieve_message", data.message)
    })
}


export const onDisconnection = (socket) => {
    console.log(`user ${socket} disconnected`)
}

