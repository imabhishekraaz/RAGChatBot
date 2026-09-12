import { io } from 'socket.io-client'

export function ConnectSocket(){
    const socket =  io('http://localhost:4000');

    return socket;
}