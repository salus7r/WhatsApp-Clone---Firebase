import React, { useCallback } from "react";
import { Button } from "@mui/material";

import { auth } from "../../firebase";

import "./login.css";

type Props = {};

const Login: React.FC<Props> = () => {
	const signIn = useCallback(() => {
		// auth.s;
	}, []);

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
					alt=""
				/>
				<div className="login__text">
					<h1>Sign in to WhatsApp</h1>
				</div>
				<Button type="submit" onClick={signIn}>
					Sign in with Google
				</Button>
			</div>
		</div>
	);
};

export default Login;
