import React from 'react'
import { Avatar } from "@mui/material"
import { Chat, DonutLarge, MoreVert } from "@mui/icons-material"

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                    <DonutLarge />
                    <Chat />
                    <MoreVert />
                </div>
            </div>
            <div className="sidebar__search"></div>
            <div className="sidebar__chats"></div>
        </div>
    )
}

export default Sidebar