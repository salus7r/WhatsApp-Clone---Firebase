import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

const AsyncChat = React.lazy(
	() => import(/* webpackChunkName: "ChatSection" */ "./components/Chat"),
);

import "./App.css";

const App: React.FC = () => {
	const [user, setUser] = useState(null);

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className={"app__body"}>
					<Suspense fallback={"Loading..."}>
						<Sidebar />
						<Routes>
							<Route path={"/rooms/:roomId"} element={<AsyncChat />} />
							<Route path={"/"} element={<AsyncChat />} />
						</Routes>
					</Suspense>
				</div>
			)}
		</div>
	);
};

export default App;
