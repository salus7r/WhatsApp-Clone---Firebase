import React, { useCallback, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";

import db from "../../firebase";

import useSeedAvatar from "../../hooks/useSeedAvatar";

import "./sidebarChat.css";

type Props = {
	addNewChat?: boolean;
	id?: string;
	name?: string;
};

const SidebarChat: React.FC<Props> = (props) => {
	const { addNewChat, id, name } = props;

	const [loading, setLoading] = useState(false);

	const seed = useSeedAvatar();

	const createChat = useCallback(async () => {
		const chatName = prompt("Please enter chat name");

		if (chatName) {
			setLoading(true);

			const docRef = await addDoc(collection(db, "rooms"), {
				name: "chatName",
			});

			setLoading(false);
		}
	}, []);

	return !addNewChat ? (
		<div className="sidebarChat">
			<Avatar src={seed} />
			<div className="sidebarChat__info">
				<h2>{name}</h2>
				<p>Last Message...</p>
			</div>
		</div>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
			{loading && <CircularProgress size="sm" />}
		</div>
	);
};

export default SidebarChat;
