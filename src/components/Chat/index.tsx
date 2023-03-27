import React, { useState, useEffect, useCallback } from "react";
import {
	doc,
	collection,
	query,
	onSnapshot,
	Unsubscribe,
	orderBy,
	DocumentData,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { Avatar, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@mui/icons-material";

import useSeedAvatar from "./../../hooks/useSeedAvatar";
import { useStateValue } from "../../store/StateProvider";

import db from "../../firebase";

import "./chat.css";

type Props = {};
type Message = DocumentData;

const Chat: React.FC<Props> = (props) => {
	const [input, setInput] = useState("");
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);

	const [{ user }] = useStateValue();

	const { roomId } = useParams();
	const seed = useSeedAvatar(roomId);

	useEffect(() => {
		let unSubRoom: Unsubscribe;
		let unSubRoomCollection: Unsubscribe;

		if (roomId) {
			unSubRoom = onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
				setRoomName(snapshot.data()?.name);
			});

			const q = query(
				collection(db, "rooms", roomId, "messages"),
				orderBy("timestamp", "asc"),
			);

			unSubRoomCollection = onSnapshot(q, (snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});
		}

		return () => {
			unSubRoom();
			unSubRoomCollection();
		};
	}, [roomId]);

	const sendMessage = useCallback(
		async (e: any) => {
			e.preventDefault();

			if (roomId) {
				setInput("");

				await addDoc(collection(db, "rooms", roomId, "messages"), {
					message: input,
					name: user.displayName,
					timestamp: serverTimestamp(),
				});
			} else {
				alert("Please select a room first");
			}
		},
		[roomId, user, input],
	);

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar src={seed} />
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>
						Last seen{" "}
						{new Date(
							messages?.[messages?.length - 1]?.timestamp?.toDate(),
						)?.toUTCString()}
					</p>
				</div>
				<div className="chat__headerRight">
					<IconButton title={"Search"}>
						<SearchOutlined />
					</IconButton>
					<IconButton title={"Attachments"}>
						<AttachFile />
					</IconButton>
					<IconButton title={"More"}>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages?.map((message) => {
					return (
						<p
							className={`chat__message ${
								message.name === user.displayName && "chat__receiver"
							}`}
							key={message.id}
						>
							<span className="chat__name">{message.name}</span>
							{message.message}
							<span className="chat__timeStamp">
								{new Date(message.timestamp?.toDate()).toUTCString()}
							</span>
						</p>
					);
				})}
			</div>
			<div className="chat__footer">
				<InsertEmoticon />
				<form>
					<input
						type="text"
						placeholder="Type a message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit" onClick={sendMessage}>
						Send a message
					</button>
				</form>
				<Mic />
			</div>
		</div>
	);
};

export default Chat;
