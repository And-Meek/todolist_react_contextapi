import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTask = (setIsCreating) => {
	const requestDeleteTask = ({ target }) => {
		const deleteTaskDbRef = ref(db, `tasks/${target.id}`);
		setIsCreating(true);
		remove(deleteTaskDbRef).finally(() => setIsCreating(false));
	};

	return { requestDeleteTask };
};
