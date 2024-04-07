import { URL, PATH } from '../constants/URL-constants';

export const useRequestDeleteTask = (setIsCreating, refreshTasks) => {
	const requestDeleteTask = ({ target }) => {
		setIsCreating(true);
		fetch(`${URL}/${PATH}/${target.id}`, {
			method: 'DELETE',
		})
			.then(() => refreshTasks())
			.finally(() => setIsCreating(false));
	};

	return { requestDeleteTask };
};
