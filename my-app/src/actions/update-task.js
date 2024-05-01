import { URL, PATH } from '../constants/URL-constants';

export const updateTask = (target, editTask) => {
	return (dispatch) => {
		dispatch({ type: 'SET_IS_CREATING', payload: true });
		fetch(`${URL}/${PATH}/${target.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				title: editTask,
			}),
		})
			.then(() => {
				dispatch({ type: 'SET_IS_UPDATING', payload: false });
			})
			.finally(() => {
				dispatch({ type: 'SET_IS_CREATING', payload: false });
			});
	};
};
