const express = require('express');
const http = require('http');
const ws = require('socket.io');
const app = express();


// create the HTTP server
const server = http.createServer(app);

const io = new ws.Server(server, {
    cors: {
        origin: "*"
    }
});
const ROOM = 'room'
io.on('connection', (socket)=> {
    socket.on('connect', ()=> {
        console.log('user connected...')
    })

    // join the username
    socket.on("joinChat", (username)=> {

        socket.join(ROOM);
        console.log(`${username} is joined.`)

        socket.to(ROOM).emit('join', username);

        socket.on('chat',(message)=> {
            console.log(message)

            socket.to(ROOM).emit('chatBot',message);
        })
    });

    
});

server.listen(4000, ()=> {
    console.log('server is running...');
})

