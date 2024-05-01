const initialState = {
	isLoading: false,
	isCreating: false,
	isUpdating: false,
};

export const controlPanelReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_IS_LOADING': {
			return { ...state, isLoading: payload };
		}
		case 'SET_IS_UPDATING': {
			return { ...state, isUpdating: !state.isUpdating };
		}
		case 'SET_IS_CREATING': {
			return { ...state, isCreating: !state.isCreating };
		}
		default: {
			return state;
		}
	}
};
