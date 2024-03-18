import themeIcon from './assets/brightness-and-contrast.png';
import './App.css';
//import { useState, useRef } from 'react';
import { useState } from 'react';

import { useChangeTheme } from './utils/use-change-theme.jsx';
import style from './utils/useChangeTheme.module.css';
//import { flushSync } from 'react-dom';
import {
	useRequestAddTask,
	useRequestDeleteTask,
	useRequestGetTasks,
	useRequestUpdateTask,
} from './hooks';

//
// 	//
// 	,

export const App = () => {
	// const [tasks, setTasks] = useState([]);
	// const [sortTasks, setSortTasks] = useState([]);
	//const [filteredTasks, setFilteredTasks] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	const { theme, changeTheme } = useChangeTheme();
	const [newTask, setNewTask] = useState('');
	//const [deleteTask, setDeleteTask] = useState('');
	//const [updateTask, setUpadateTask] = useState('');
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	//const [isUpdating, setIsUpdating] = useState(false);
	// const [isSorted, setIsSorted] = useState(false);
	const [error, setError] = useState(false);
	//const updatedInputRef = useRef(null);
	//const updateBtnRef = useRef(null);
	//const [idRef, setIdRef] = useState(0);
	const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
	// const refreshSorted = () => setIsSorted(!isSorted);

	const {
		//tasks,
		//sortTasks,
		filteredTasks,
		//setFilteredTasks,
		isLoading,
		isSorted,
		requestSortTask,
		requestFindTask,
	} = useRequestGetTasks(refreshTasksFlag, refreshTasks);

	const { requestAddTask } = useRequestAddTask(
		setIsCreating,
		newTask,
		setError,
		refreshTasks,
		setNewTask,
	);

	const { requestDeleteTask } = useRequestDeleteTask(setIsCreating, refreshTasks);

	const {
		setUpadateTask,
		clickOnUpdateTask,
		isUpdating,
		idRef,
		updatedInputRef,
		updateBtnRef,
	} = useRequestUpdateTask(refreshTasks, setIsCreating);

	// const { requestFindTask } = useRequestFindTasks(
	// 	isSorted,
	// 	sortTasks,
	// 	setFilteredTasks,
	// 	tasks,
	// );
	//const { requestSortTask } = useRequestSortTasks(refreshSorted, setSortTasks, sortTasks);
	// useEffect(() => {
	// 	setIsLoading(true);
	// 	fetch('http://localhost:3005/tasks')
	// 		.then((loadedData) => loadedData.json())
	// 		.then((loadedTasks) => {
	// 			setTasks(loadedTasks);
	// 			const futureSort = [...loadedTasks];
	// 			const futureFind = [...loadedTasks];
	// 			setSortTasks(futureSort);
	// 			setFilteredTasks(futureFind);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// }, [refreshTasksFlag]);

	// const requestAddTask = () => {
	// 	setIsCreating(true);
	// 	if (newTask === '') {
	// 		setError(true);
	// 		setIsCreating(false);
	// 	} else {
	// 		fetch('http://localhost:3005/tasks', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json; charset=utf-8' },
	// 			body: JSON.stringify({
	// 				title: newTask,
	// 			}),
	// 		})
	// 			.then((rawResponse) => rawResponse.json())
	// 			.then(() => {
	// 				refreshTasks();
	// 			})
	// 			.finally(() => {
	// 				setNewTask('');
	// 				setIsCreating(false);
	// 			});
	// 	}
	// };

	// const requestFindTask = ({ target }) => {
	// 	if (target.value.length !== 0) {
	// 		if (isSorted) {
	// 			const filteredTasksArray = sortTasks.filter((task) => {
	// 				return task.title.includes(target.value);
	// 			});
	// 			return setFilteredTasks(filteredTasksArray);
	// 		} else {
	// 			const filteredTasksArray = tasks.filter((task) => {
	// 				return task.title.includes(target.value);
	// 			});
	// 			return setFilteredTasks(filteredTasksArray);
	// 		}
	// 	}
	// 	if (isSorted) {
	// 		return setFilteredTasks(sortTasks);
	// 	}
	// 	return setFilteredTasks(tasks);
	// };

	// const clickOnUpdateTask = ({ target }) => {
	// 	setIsUpdating(true);
	// 	flushSync(() => {
	// 		setIdRef(target.id);
	// 	});
	// 	if (updateBtnRef.current.className === 'updateTask updatingTask') {
	// 		requestUpdateTask(target);
	// 		updateBtnRef.current.classList.remove('updatingTask');
	// 	} else {
	// 		updateBtnRef.current.classList.add('updatingTask');
	// 		updatedInputRef.current.focus();
	// 	}
	// };

	// const requestUpdateTask = (target) => {
	// 	fetch(`http://localhost:3005/tasks/${target.id}`, {
	// 		method: 'PATCH',
	// 		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	// 		body: JSON.stringify({
	// 			title: updateTask,
	// 		}),
	// 	})
	// 		.then(() => {
	// 			setIsUpdating(false);
	// 		})
	// 		.then(updateBtnRef.current.classList.remove('updatingTask'))
	// 		.finally(refreshTasks());
	// };

	// const requestDeleteTask = ({ target }) => {
	// 	setIsCreating(true);
	// 	fetch(`http://localhost:3005/tasks/${target.id}`, {
	// 		method: 'DELETE',
	// 	})
	// 		.then(refreshTasks())
	// 		.finally(setIsCreating(false));
	// };

	// const requestSortTask = () => {
	// 	console.log('SORT', tasks);
	// 	refreshSorted();
	// 	setSortTasks(
	// 		sortTasks.sort((a, b) => {
	// 			if (a.title < b.title) {
	// 				return -1;
	// 			}
	// 			if (a.title > b.title) {
	// 				return 1;
	// 			}
	// 			return 0;
	// 		}),
	// 	);
	// 	console.log(isSorted);
	// };

	const handlerUpdateTask = ({ target }) => {
		setUpadateTask(target.value);
	};

	const handlerNewTask = ({ target }) => {
		setError(false);
		setNewTask(target.value);
	};

	return (
		<div className={`${'App'} ${theme === 'dark' ? style.Dark : style.Light}`}>
			<img src={themeIcon} className="img" alt="toggleTheme" onClick={changeTheme} />
			<span>Todos list</span>
			{error ? <span className="error">Поле не может быть пустым!</span> : ''}
			<div className="inputMenu">
				<input
					className="inputTask"
					type="text"
					placeholder="Новая задача..."
					onChange={handlerNewTask}
					value={newTask}
				></input>
				<button
					className={`${'createTask'} ${isCreating ? 'disabled' : ''}`}
					onClick={requestAddTask}
					disabled={isCreating}
				>
					Добавить
				</button>
			</div>
			<div className="searchAndSortMenu">
				<input
					className="inputFind"
					type="text"
					placeholder="Найти задачу..."
					onChange={requestFindTask}
				></input>
				<button
					className={`${'sortTask'} ${isCreating ? 'disabled' : ''}`}
					disabled={isCreating}
					onClick={requestSortTask}
				></button>
			</div>
			{isLoading ? (
				<div className="loader"></div>
			) : isSorted ? (
				filteredTasks.map(({ id, title }) => (
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
							onClick={requestDeleteTask}
						></button>
					</div>
				))
			) : (
				filteredTasks.map(({ id, title }) => (
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
							onClick={requestDeleteTask}
						></button>
					</div>
				))
			)}
		</div>
	);
};
