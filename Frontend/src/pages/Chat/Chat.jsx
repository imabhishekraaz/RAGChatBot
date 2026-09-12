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
        setMsg('Abhishek Raj')
    }

    return (
        <>
            <div>
                <div>
                    <p>Chat Box</p>

                </div>
                <div>
                    message
                </div>
                <div>
                    <input type="text" name="input" id="input" />
                    <p onClick={handleSubmit}>send</p>
                </div>
                {
                    msg ? <div>
                        {msg} <span>Joined a group.</span>
                    </div> : <div>No message</div>
                }
            </div>            
        </>
    )
}

export default Chat;