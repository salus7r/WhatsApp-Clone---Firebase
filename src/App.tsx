import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

import { useStateValue } from "./store/StateProvider";

const AsyncChat = React.lazy(
	() => import(/* webpackChunkName: "ChatSection" */ "./components/Chat"),
);

import "./App.css";

const App: React.FC = () => {
	const [{ user }, dispatch] = useStateValue();

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
