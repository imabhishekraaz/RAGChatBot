const express = require('express');
const { ConnectDatabase } = require('./src/config/db');
const dotenv = require('dotenv').config();
const dns = require('dns');

dns.setServers(['0.0.0.0','1.1.1.1']);
const http = require('http');
const ws = require('ws');

const app = express();

// middleware
app.use(express.json())

// connect the database
// ConnectDatabase();

// create the http server and pass the express server on it.
const server = http.createServer(app);

// create the websocket server on it and run on the same port
const wss = new ws.Server({server:server});

// make connections
wss.on("connection", (socket)=> {
    socket.send("user connected!")
    console.log('A user is connected')
    
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
