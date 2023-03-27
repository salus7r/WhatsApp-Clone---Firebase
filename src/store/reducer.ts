export const initialState: Store = {
	user: null,
};

export const actionTypes = {
	SET_USER: "SET_USER",
};

export type Store = {
	user?: any;
};

export type Action = {
	type: keyof typeof actionTypes;
	payload: any;
};

export const setUser = (user: any) => {
	return {
		type: "SET_USER",
		payload: user,
	} as Action;
};

const reducer = (state: Store, action: Action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
