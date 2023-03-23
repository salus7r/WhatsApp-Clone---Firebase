import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";

import useSeedAvatar from "./../../hooks/useSeedAvatar";
import "./chat.css";

type Props = {};

const Chat: React.FC<Props> = (props) => {
	const seed = useSeedAvatar();

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar src={seed} />
				<div className="chat__headerInfo">
					<h3>Room Name</h3>
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
			<div className="chat__body"></div>
			<div className="chat__footer"></div>
		</div>
	);
};

export default Chat;
