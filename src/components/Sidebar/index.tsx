import React from 'react'
import { Avatar } from "@mui/material"

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
            </div>
            <div className="sidebar__search"></div>
            <div className="sidebar__chats"></div>
        </div>
    )
}

export default Sidebar