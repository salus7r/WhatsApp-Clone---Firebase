import React, { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { Avatar, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@mui/icons-material";

import useSeedAvatar from "./../../hooks/useSeedAvatar";

import db from "../../firebase";

import "./chat.css";

type Props = {};

const Chat: React.FC<Props> = (props) => {
	const [input, setInput] = useState("");
	const [roomName, setRoomName] = useState("");

	const { roomId } = useParams();
	const seed = useSeedAvatar(roomId);

	useEffect(() => {
		let unsubscribe: Unsubscribe;

		if (roomId) {
			unsubscribe = onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
				setRoomName(snapshot.data()?.name);
			});
		}

		return () => {
			unsubscribe();
		};
	}, [roomId]);

	const sendMessage = useCallback(
		(e: any) => {
			e.preventDefault();

			console.log("You typed " + input);
			setInput("");
		},
		[input],
	);

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar src={seed} />
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>Last seen at...</p>
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
				<p className="chat__message">
					<span className="chat__name">Salman Zahid Latif</span>
					Hey Guys...
					<span className="chat__timeStamp">3:52pm</span>
				</p>
				<p className={`chat__message ${true && "chat__receiver"}`}>
					<span className="chat__name">Salman Zahid Latif</span>
					Hey Guys...
					<span className="chat__timeStamp">3:52pm</span>
				</p>
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
