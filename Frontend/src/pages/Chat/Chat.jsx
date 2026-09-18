import React, { useState } from "react";
import { useEffect, useRef } from "react";
// import { ConnectSocket } from "../../ws";
import { io } from 'socket.io-client';

const Chat = () => {
    const socket = useRef(null);
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState(null);

    const [msg, setMsg] = useState([
        { text: 'Hii, I am abhishek Raj', mine: true },
        { text: "Hello from other side", mine: false }
    ]);
    const [isTyping, setIsTyping] = useState("");

    const ws = io('http://localhost:4000', {
        autoConnect: false
    });

    useEffect(() => {

        socket.current = ws.connect();
        socket.current.on('connect', () => {
            console.log('user connected....')
        });
        socket.current.on("join", (username) => {
            console.log("JOIN EVENT RECEIVED:", username);
        });

        socket.current.on('chatBot',(message)=> {

            const newMsg = {
                text :message,
                mine: false
            };
            setMsg((prev)=> [...prev,newMsg]);
        })

       
        return

    }, []);

    // handle user login 
    const handleLogin = () => {
        if (userName === null) {
            return
        };

        // adding the details in the vscode for commiting the files again i try to 
        // set the login
        setIsLogin(true);

        socket.current.emit('joinChat', userName);
    };

    const handleMessage = () => {
        if (isTyping.trim() === "") {
            return;
        }

        const newMsg = {
            text: isTyping,
            mine: true
        }
        // working 
        socket.current.emit('chat',isTyping)
        setIsTyping((prev)=> [...prev, isTyping]);

        setIsTyping("");
    }


    return (
        <>
            {isLogin ? (
                < div className="grid  grid-rows-[10%_80%_10%] h-screen">
                    <div className=" text-center text-2xl">
                        <h2 className="text-black font-bold">ChatBox</h2>
                        <hr />
                    </div>
                    <div>
                        {msg.map((message, index) => {
                            const isMine = message.mine;

                            return (
                                <div key={index} className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
                                    {isMine ? (
                                        <div className="bg-blue-500 text-white max-w-[70%] rounded-2xl rounded-tr-none px-4 py-2 shadow-sm">
                                            {message.text}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-200 text-gray-800 max-w-[70%] rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="rounded-2xl flex">
                        <div className="relative w-full p-4 m-5 bg-red-400">
                            <textarea
                                className="w-full outline-none border-none"
                                name="text"
                                id="text"
                                placeholder="Enter your message"
                                value={isTyping}
                                onChange={(e) => setIsTyping(e.target.value)}
                            ></textarea>
                            <div
                                className="absolute right-0 top-0 rounded-full bg-red-500 w-14 h-10 text-center flex items-center justify-center">
                                <button
                                    onClick={handleMessage}
                                >
                                    send
                                </button>
                            </div>
                        </div>
                    </div>

                </div >
            ) : (
                <div className="w-screen h-screen bg-green-500">
                    <div className="flex justify-center items-center h-full w-full">
                        <div className="flex flex-col">
                            <label htmlFor="name">Enter your name</label>
                            <input
                                className="bg-white"
                                placeholder="enter your name"
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                id="name" />
                        </div>
                        <div>
                            <button
                                className="bg-red-500 w-10 h-10"
                                onClick={handleLogin}
                            >Join</button>
                        </div>
                    </div>

                </div>)}

        </>
    )
}

export default Chat;