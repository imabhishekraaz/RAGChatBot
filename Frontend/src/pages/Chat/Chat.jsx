import React from "react";
import { useEffect, useRef } from "react";
import { ConnectSocket } from "../../ws";

const Chat = ()=> {
    const socket = useRef(null);

    useEffect(()=> {    
        socket.current = ConnectSocket();
        // socket.current.on('connect', ()=> {
        //     console.log('server is connected...')
        // })
    }, [])

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
                    <button>send</button>
                </div>
            </div>            
        </>
    )
}

export default Chat;