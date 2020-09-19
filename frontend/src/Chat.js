import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
const Chat = ({ messages }) => {
    const [input, setInput] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            message: input,
            name: "Unknown",
            timestamp: "Just Now",
            received: false,

        });
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar />
                <div className="chat-right">
                    <h3>Dance Room</h3>
                    <p>Last Seen...</p>
                </div>
                <div className="chat-symbol">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>


                </div>


            </div>
            <div className="chat-body">

                {messages.map((message) => {

                    return (
                        <p className={`chat-message ${message.received && "chat-receiver"}`}>
                            <span className="chat_name">
                                {message.name}

                            </span>
                            {message.message}


                            <span className="chat_timestamp">
                                {message.timestamp}
                            </span>
                        </p>
                    )
                })}

                <p className="chat-message chat-receiver">
                    <span className="chat_name">
                        Priya
                        </span>
                        This is my message

                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className="chat-message">
                    <span className="chat_name">
                        Priya
                        </span>
                        This is my message

                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>
            <div className="chat-footer">
                <InsertEmotionIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send A Message</button>
                </form>
                <MicIcon />

            </div>
        </div >
    )
}



export default Chat;