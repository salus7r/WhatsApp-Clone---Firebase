import React, { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from "react";
import { Action, Store } from "./reducer";

export type Props = {
	reducer: (state: Store, action: Action) => Store;
	initialState: Store;
};

export const StateContext = createContext<[Store, Dispatch<Action>]>([{}, () => {}]);

export const StateProvider = ({ reducer, initialState, children }: PropsWithChildren<Props>) => {
	return (
		<StateContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateValue = () => useContext(StateContext);
