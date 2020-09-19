import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat";


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://avatars0.githubusercontent.com/u/61323807?s=400&u=f710e84e6db838c86f6fced6ca94240167ed5b3a&v=4" />
                <div className="sidebar_headerright">

                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>

            </div>
            <div className="searchbar">
                <div className="searchbar_container">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or Start New Chat " />

                </div>

            </div>
            <div className="sidebar_chat">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />


            </div>
        </div>
    )
}



export default Sidebar;