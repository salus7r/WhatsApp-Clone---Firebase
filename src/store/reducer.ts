export const initialState = {
	user: null,
};

export const actionTypes = {
	SET_USER: "SET_USER",
};

export type Store = typeof initialState;

export type Action = {
	type: keyof typeof actionTypes;
	payload: any;
};

export const setUser = (user: any) => {
	return {
		type: actionTypes.SET_USER,
		payload: user,
	};
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
