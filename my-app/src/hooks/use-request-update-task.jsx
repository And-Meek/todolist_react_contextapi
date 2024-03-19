import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTask = (setIsCreating) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateTask, setUpadateTask] = useState('');
	const [idRef, setIdRef] = useState(0);
	const updatedInputRef = useRef(null);
	const updateBtnRef = useRef(null);

	const clickOnUpdateTask = ({ target }) => {
		setIsUpdating(true);
		flushSync(() => {
			setIdRef(target.id);
		});
		if (updateBtnRef.current.className === 'updateTask updatingTask') {
			requestUpdateTask(target);
			updateBtnRef.current.classList.remove('updatingTask');
		} else {
			updateBtnRef.current.classList.add('updatingTask');
			updatedInputRef.current.focus();
		}
	};

	const requestUpdateTask = (target) => {
		const updateTaskDbRef = ref(db, `tasks/${target.id}`);
		setIsCreating(true);
		update(updateTaskDbRef, {
			title: updateTask,
		})
			.then(() => {
				setIsUpdating(false);
			})
			.then(updateBtnRef.current.classList.remove('updatingTask'))
			.finally(() => {
				setIsCreating(false);
			});
	};

	return {
		setUpadateTask,
		clickOnUpdateTask,
		isUpdating,
		idRef,
		updatedInputRef,
		updateBtnRef,
	};
};
