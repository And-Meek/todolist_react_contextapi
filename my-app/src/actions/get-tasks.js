import { URL, PATH } from '../constants/URL-constants';

export const getTask = () => (dispatch) =>
	fetch(`${URL}/${PATH}`)
		.then((loadedData) => loadedData.json())
		.then((loadedTasks) =>
			dispatch({
				type: 'GET_TASKS',
				payload: loadedTasks,
			}),
		);
