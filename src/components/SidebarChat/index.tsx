import React, { useCallback, useEffect, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
	collection,
	query,
	onSnapshot,
	Unsubscribe,
	orderBy,
	addDoc,
	DocumentData,
} from "firebase/firestore";

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
	const [messages, setMessages] = useState<DocumentData[]>([]);

	const { roomId } = useParams();
	const seed = useSeedAvatar();

	useEffect(() => {
		let unSubRoomCollection: Unsubscribe;

		if (id) {
			const q = query(collection(db, "rooms", id, "messages"), orderBy("timestamp", "desc"));

			onSnapshot(q, (snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});
		}

		return () => {
			unSubRoomCollection?.();
		};
	}, []);

	const createChat = useCallback(async () => {
		const chatName = prompt("Please enter chat name");

		if (chatName) {
			setLoading(true);

			await addDoc(collection(db, "rooms"), {
				name: chatName,
			});

			setLoading(false);
		}
	}, []);

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className={`sidebarChat ${id === roomId ? "sidebarChat__active" : ""}`}>
				<Avatar src={seed} />
				<div className="sidebarChat__info">
					<h2>{name}</h2>
					<p>{messages?.[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
			{loading && <CircularProgress size="sm" />}
		</div>
	);
};

export default SidebarChat;
