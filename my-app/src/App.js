import themeIcon from './assets/brightness-and-contrast.png';
import './App.css';
import { useState } from 'react';
import { useChangeTheme } from './utils/use-change-theme.jsx';
import style from './utils/useChangeTheme.module.css';
import {
	useRequestAddTask,
	useRequestDeleteTask,
	useRequestGetTasks,
	useRequestUpdateTask,
} from './hooks';
import { ControlPanel, Todo, Loader } from './components/index.jsx';
import { AppContext } from './context.js';

export const App = () => {
	const { theme, changeTheme } = useChangeTheme();
	const [newTask, setNewTask] = useState('');
	const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState(false);
	const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
	const { filteredTasks, isLoading, requestSortTask, requestFindTask } =
		useRequestGetTasks(refreshTasksFlag, refreshTasks);

	const { requestAddTask } = useRequestAddTask(
		setIsCreating,
		newTask,
		setError,
		setNewTask,
	);

	const { requestDeleteTask } = useRequestDeleteTask(setIsCreating);

	const {
		setUpadateTask,
		clickOnUpdateTask,
		isUpdating,
		idRef,
		updatedInputRef,
		updateBtnRef,
	} = useRequestUpdateTask(setIsCreating);

	const handlerUpdateTask = ({ target }) => {
		setUpadateTask(target.value);
	};

	const handlerNewTask = ({ target }) => {
		setError(false);
		setNewTask(target.value);
	};

	return (
		<AppContext.Provider
			value={{
				handlerNewTask,
				error,
				isCreating,
				newTask,
				requestAddTask,
				requestFindTask,
				requestSortTask,
				filteredTasks,
				isUpdating,
				handlerUpdateTask,
				clickOnUpdateTask,
				requestDeleteTask,
				updateBtnRef,
				updatedInputRef,
				idRef,
			}}
		>
			<div className={`${'App'} ${theme === 'dark' ? style.Dark : style.Light}`}>
				<img src={themeIcon} className="img" alt="toggleTheme" onClick={changeTheme} />
				<span>Todos list</span>
				<ControlPanel />
				{isLoading ? <Loader /> : <Todo />}
			</div>
		</AppContext.Provider>
	);
};
