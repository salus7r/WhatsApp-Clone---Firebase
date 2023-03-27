import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StateProvider>
	</React.StrictMode>,
);
