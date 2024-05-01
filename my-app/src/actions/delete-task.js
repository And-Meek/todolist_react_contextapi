import { URL, PATH } from '../constants/URL-constants';

export const deleteTask = ({ id }) => {
	return (dispatch) => {
		dispatch({ type: 'SET_IS_CREATING', payload: true });
		fetch(`${URL}/${PATH}/${id}`, {
			method: 'DELETE',
		})
			.then(() => dispatch({ type: 'REMOVE_TASK', payload: id }))
			.finally(() => dispatch({ type: 'SET_IS_CREATING', payload: false }));
	};
};
