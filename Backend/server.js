const express = require('express');
const { ConnectDatabase } = require('./src/config/db');
const dotenv = require('dotenv').config();
const dns = require('dns');

dns.setServers(['0.0.0.0', '1.1.1.1']);
const http = require('http');
const socket = require('socket.io');
const app = express();

// middleware
app.use(express.json())

// connect the database
// ConnectDatabase();

// create the http server and pass the express server on it.
const server = http.createServer(app);

// create the websocket server on it and run on the same port
const wss = new socket.Server(server, {
    cors: {
        origin: "*"
    }
});

// make connections
wss.on("connection", (socket) => {
    console.log('client connected:', socket.id);

    // Join the user
    socket.on("joinRoom", async (userName) => {
        console.log(userName, 'Joined a group!')

        await socket.join("group");

        // broadcast the details
        socket.to("group").emit("roomNotice", userName);

    });
     // Chat the user
        socket.on('chat', (message) => {
            console.log(message)

            wss.to("group").emit("userChat", {
                ...message,
                senderId: socket.id
            });
        });

    // close the connection
    socket.on('disconnect', (reason) => {
        console.log('client disconnected:', socket.id, reason);
    })
});

server.listen(4000, () => {
    console.log('server is running...');
})
