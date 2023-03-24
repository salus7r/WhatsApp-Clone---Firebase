import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@mui/icons-material";
import { collection, query, onSnapshot, DocumentData } from "firebase/firestore";

import db from "../../firebase";

import SidebarChat from "../SidebarChat";
import "./sidebar.css";

type Props = {};
type Room = {
	id: string;
	data: DocumentData;
};

const Sidebar: React.FC<Props> = (props) => {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		const q = query(collection(db, "rooms"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setRooms(querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
		});
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar />
				<div className="sidebar__headerRight">
					<IconButton title={"Statuses"}>
						<DonutLarge />
					</IconButton>
					<IconButton title={"Chats"}>
						<Chat />
					</IconButton>
					<IconButton title={"More"}>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input placeholder="Search or start new chat" type="text" />
				</div>
			</div>
			<div className="sidebar__chats">
				<SidebarChat addNewChat />
				{rooms?.map((room) => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
