import { URL, PATH } from '../constants/URL-constants';

export const addTask = (newTask) => {
	return (dispatch) => {
		dispatch({
			type: 'SET_IS_CREATING',
		});
		if (newTask === '') {
			dispatch({
				type: 'SET_ERROR',
				payload: true,
			});
			dispatch({
				type: 'SET_IS_CREATING',
			});
		} else {
			dispatch({ type: 'SET_IS_LOADING', payload: true });
			fetch(`${URL}/${PATH}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				body: JSON.stringify({
					title: newTask,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => dispatch({ type: 'ADD_TASK', payload: response }))
				.finally(() => dispatch({ type: 'SET_IS_LOADING', payload: false }));
			dispatch({
				type: 'SET_IS_CREATING',
			});
		}
	};
};
