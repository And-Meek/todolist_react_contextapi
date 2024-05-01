import { flushSync } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTasks,
	selectIdRef,
	selectIsUpdating,
	selectIsCreating,
	selectFilteredTask,
	selectIsSorting,
} from '../../selectors';
import { updateTask } from '../../actions/update-task';
import { deleteTask } from '../../actions/delete-task';
import { getTask } from '../../actions/get-tasks';
import { SET_IS_LOADING } from '../../actions/set-isLoading';

export const Todo = () => {
	const tasks = useSelector(selectTasks);
	const filteredTask = useSelector(selectFilteredTask);
	const idRef = useSelector(selectIdRef);
	const updateBtnRef = useRef(null);
	const updatedInputRef = useRef(null);
	const isUpdating = useSelector(selectIsUpdating);
	const isCreating = useSelector(selectIsCreating);
	const isSorting = useSelector(selectIsSorting);
	const [editTask, setEditTask] = useState('');

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(SET_IS_LOADING);

	// 	dispatch(getTask()).catch((error) => {
	// 		console.log(error);
	// 	});
	// 	//.finally(() => dispatch(SET_IS_LOADING));
	// }, []);

	const handlerUpdateTask = ({ target }) => {
		setEditTask(target.value);
	};

	let filteredTasks = [...tasks];

	const filteredArray = [];

	if (filteredTask !== '') {
		filteredTasks = filteredTasks.map((task) => {
			if (task.title.toLowerCase().includes(filteredTask.toLowerCase())) {
				return filteredArray.push(task);
			}
			return filteredArray;
		});
	}

	if (filteredArray.length !== 0) {
		filteredTasks = filteredArray;
	}

	if (isSorting === true) {
		filteredTasks = filteredTasks.toSorted((a, b) => a.title.localeCompare(b.title));
	}

	const clickOnUpdateTask = ({ target }) => {
		dispatch({ type: 'SET_IS_UPDATING' });
		flushSync(() => {
			dispatch({ type: 'SET_ID_REF', payload: target.id });
		});
		if (updateBtnRef.current.className === 'updateTask updatingTask') {
			requestUpdateTask(target);
			setEditTask('');
			dispatch({ type: 'SET_IS_UPDATING' });
			updateBtnRef.current.classList.remove('updatingTask');
		} else {
			updateBtnRef.current.classList.add('updatingTask');
			updatedInputRef.current.focus();
		}
	};

	const requestUpdateTask = (target) => {
		dispatch(updateTask(target, editTask));
	};

	const useRequestDeleteTask = ({ target }) => {
		dispatch(deleteTask(target));
	};

	return filteredTasks.map(({ id, title }) => (
		<div className="todosList" key={id}>
			<input
				ref={idRef === id ? updatedInputRef : null}
				className="List"
				defaultValue={title}
				disabled={!isUpdating}
				id={id}
				onChange={handlerUpdateTask}
			></input>
			<button
				ref={idRef === id ? updateBtnRef : null}
				className={`${'updateTask'} ${isCreating ? 'disabled' : ''}`}
				id={id}
				disabled={isCreating}
				onClick={clickOnUpdateTask}
			></button>
			<button
				className={`${'deleteTask'} ${isCreating ? 'disabled' : ''}`}
				id={id}
				disabled={isCreating}
				onClick={useRequestDeleteTask}
			></button>
		</div>
	));
};
