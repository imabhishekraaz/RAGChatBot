import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { ConnectSocket } from "../../ws";

const Chat = ()=> {
    const socket = useRef(null);
    const [msg, setMsg] = useState(null);

    useEffect(()=> {    
        socket.current = ConnectSocket();
        socket.current.on('connect', ()=> {
            console.log('user is connected...')
        })
    }, [])

    const handleSubmit = ()=> {
        const message = socket.current.emit("joinRoom", 'Abhishek Raj');
    }

    return (
        <>
            <div className="grid  grid-rows-[10%_80%_10%] h-screen">
                <div className=" text-center text-2xl">
                    <h2 className="text-black font-bold">ChatBox</h2>
                    <hr />
                </div>
                <div>
                    <h1>No message</h1>
                </div>
                <div className="bg-blue-500 rounded-2xl grid grid-cols-[90%_10%]">
                    <div>
                        <textarea 
                            className="px-5"
                            name="text" 
                            id="text"
                            placeholder="Enter your message"
                            cols={30}
                            rows={2}></textarea>
                    </div>
                    <div className="">
                        <button>send</button>
                    </div>
                </div>
               
            </div>            
        </>
    )
}

export default Chat;