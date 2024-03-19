import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTask = (setIsCreating, newTask, setError, setNewTask) => {
	const tasksDbRef = ref(db, 'tasks');

	const requestAddTask = () => {
		setIsCreating(true);
		if (newTask === '') {
			setError(true);
			setIsCreating(false);
		} else {
			push(tasksDbRef, {
				title: newTask,
			}).then(() => {
				setNewTask('');
				setIsCreating(false);
			});
		}
	};

	return { requestAddTask };
};
