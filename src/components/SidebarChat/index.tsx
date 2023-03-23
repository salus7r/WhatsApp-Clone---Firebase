import React, { useCallback } from "react";
import { Avatar } from "@mui/material";

import useSeedAvatar from "../../hooks/useSeedAvatar";

import "./sidebarChat.css";

type Props = {
	addNewChat?: boolean;
};

const SidebarChat: React.FC<Props> = (props) => {
	const { addNewChat } = props;

	const seed = useSeedAvatar();

	const createChat = useCallback(() => {
		const chatName = prompt("Please enter chat name");

		if (chatName) {
			// do something here
		}
	}, []);

	return !addNewChat ? (
		<div className="sidebarChat">
			<Avatar src={seed} />
			<div className="sidebarChat__info">
				<h2>Room name</h2>
				<p>Last Message...</p>
			</div>
		</div>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
		</div>
	);
};

export default SidebarChat;
