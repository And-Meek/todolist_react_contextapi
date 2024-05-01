import themeIcon from './assets/brightness-and-contrast.png';
import './App.css';
import { useChangeTheme } from './utils/use-change-theme.jsx';
import style from './utils/useChangeTheme.module.css';
import { ControlPanel, Todo, Loader } from './components/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from './selectors';
import { useEffect } from 'react';
import { getTask } from './actions/get-tasks.js';
import { SET_IS_LOADING } from './actions/set-isLoading.js';

export const App = () => {
	const { theme, changeTheme } = useChangeTheme();

	const dispatch = useDispatch();

	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		dispatch(SET_IS_LOADING(true));

		dispatch(getTask()).then(() => dispatch(SET_IS_LOADING(false)));
	}, []);

	return (
		<div className={`${'App'} ${theme === 'dark' ? style.Dark : style.Light}`}>
			<img src={themeIcon} className="img" alt="toggleTheme" onClick={changeTheme} />
			<span>Todos list</span>
			<ControlPanel />
			{isLoading ? <Loader /> : <Todo />}
		</div>
	);
};
