export const findTask = (target) => {
	return (dispatch) => {
		dispatch({ type: 'SET_FILTERED_TASKS', payload: target });
	};
};
