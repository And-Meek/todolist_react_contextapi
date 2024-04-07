import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { PATH, URL } from '../constants/URL-constants';

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
		fetch(`${URL}/${PATH}/${target.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				title: updateTask,
			}),
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
