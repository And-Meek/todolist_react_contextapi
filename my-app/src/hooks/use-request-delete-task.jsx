import { URL, PATH } from '../constants/URL-constants';

export const useRequestDeleteTask = (setIsCreating, refreshTasks) => {
	const requestDeleteTask = ({ target }) => {
		const deleteTaskDbRef = ref(db, `tasks/${target.id}`);
		setIsCreating(true);
		fetch(`${URL}/${PATH}/${target.id}`, {
			method: 'DELETE',
		})
			.then(() => refreshTasks())
			.finally(() => setIsCreating(false));
	};

	return { requestDeleteTask };
};
