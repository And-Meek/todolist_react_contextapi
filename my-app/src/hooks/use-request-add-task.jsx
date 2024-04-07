import { PATH, URL } from '../constants/URL-constants';

export const useRequestAddTask = (
	setIsCreating,
	newTask,
	setError,
	refreshTasks,
	setNewTask,
) => {
	const requestAddTask = () => {
		setIsCreating(true);
		if (newTask === '') {
			setError(true);
			setIsCreating(false);
		} else {
			fetch(`${URL}/${PATH}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				body: JSON.stringify({
					title: newTask,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then(() => {
					refreshTasks();
				})
				.finally(() => {
					setNewTask('');
					setIsCreating(false);
				});
		}
	};

	return { requestAddTask };
};
