const express = require('express');
const { ConnectDatabase } = require('./src/config/db');
const dotenv = require('dotenv').config();
const dns = require('dns');

dns.setServers(['0.0.0.0','1.1.1.1']);
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
wss.on("connection", (socket)=> {
    // send the message when user connect to the server
    socket.send("user connected!")

    socket.on("joinRoom", (userName) => {
        console.log(userName, 'Joined a group!')
    });
    
    socket.on('message', (message)=> {
        socket.send(message.toString());
    });

    // close the connection
    socket.on('close', ()=> {
        console.log('close the server...'); 
    })
});

server.listen(4000, ()=> {
    console.log('server is running...');
})
