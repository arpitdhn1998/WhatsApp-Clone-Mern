
import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

const SidebarChat = () => {
    return (
        <div className="sidebarchat">
            <Avatar />
            <div className="avatar_chat">
                <h2>Roomname</h2>
                <p>I m sending you the last message</p>
            </div>
        </div>
    )
}
export default SidebarChat;