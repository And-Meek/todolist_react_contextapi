import themeIcon from './brightness-and-contrast.png';
import './App.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [theme, setTheme] = useState('dark');
	const changeTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTasks(loadedTasks);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<div className={`${'App'} ${theme === 'dark' ? 'Dark' : 'Light'}`}>
			<img src={themeIcon} className="img" alt="toggleTheme" onClick={changeTheme} />
			<span>Todos list</span>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				tasks.map(({ userId, id, title, completed }) => (
					<div className="List" key={id}>
						{title}
					</div>
				))
			)}
		</div>
	);
};
