import { useEffect, useState } from 'react';
import { URL, PATH } from '../constants/URL-constants';

export const useRequestGetTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [sortTasks, setSortTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${URL}/${PATH}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTasks(loadedTasks);
				const futureSort = [...loadedTasks];
				const futureFind = [...loadedTasks];
				setSortTasks(
					futureSort.sort((a, b) => {
						if (a.title < b.title) {
							return -1;
						}
						if (a.title > b.title) {
							return 1;
						}
						return 0;
					}),
				);
				setFilteredTasks(futureFind);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshTasksFlag]);

	const requestSortTask = () => {
		if (!isSorted) {
			setFilteredTasks(sortTasks);
		} else {
			setFilteredTasks(tasks);
		}
		setIsSorted(!isSorted);
	};

	const requestFindTask = ({ target }) => {
		if (target.value.length !== 0) {
			if (isSorted) {
				const filteredTasksArray = sortTasks.filter((task) => {
					return task[1].title.toLowerCase().includes(target.value.toLowerCase());
				});
				return setFilteredTasks(filteredTasksArray);
			} else {
				const filteredTasksArray = tasks.filter((task) => {
					return task[1].title.toLowerCase().includes(target.value.toLowerCase());
				});
				return setFilteredTasks(filteredTasksArray);
			}
		}
		if (isSorted) {
			return setFilteredTasks(sortTasks);
		}
		return setFilteredTasks(tasks);
	};

	return {
		tasks,
		sortTasks,
		filteredTasks,
		setFilteredTasks,
		isLoading,
		requestSortTask,
		requestFindTask,
	};
};
