const initialState = {
	tasks: [],
	isSorting: false,
	filteredTask: '',
	error: false,
	refreshTasksFlag: false,
	idRef: null,
	updatedInputRef: null,
	updateBtnRef: null,
	updateTask: '',
};

export const taskReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_FILTERED_TASKS': {
			return { ...state, filteredTask: payload };
		}
		case 'GET_TASKS': {
			return { ...state, tasks: payload };
		}
		case 'SET_UPDATE_TASK': {
			return { ...state, updateTask: payload };
		}
		case 'REMOVE_TASK': {
			return { ...state, tasks: state.tasks.filter((task) => task.id !== payload) };
		}
		case 'SET_ID_REF': {
			return { ...state, idRef: payload };
		}
		case 'SET_ERROR': {
			return { ...state, error: payload };
		}
		case 'ADD_TASK': {
			return { ...state, tasks: [...state.tasks, payload] };
		}
		case 'FIND_TASK': {
			return {
				...state,
			};
		}
		case 'SORT_TASK': {
			return { ...state, isSorting: !state.isSorting };
		}
		default: {
			return state;
		}
	}
};
