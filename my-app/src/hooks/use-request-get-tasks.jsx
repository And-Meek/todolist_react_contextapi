import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [sortTasks, setSortTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		const tasksDbRef = ref(db, 'tasks');

		return onValue(tasksDbRef, (snapshot) => {
			const loadedTasks = snapshot.val() || {};
			const loadedTasksMassive = Object.entries(loadedTasks);
			setTasks(loadedTasksMassive);
			const futureSort = [...loadedTasksMassive];
			setSortTasks(
				futureSort.sort((a, b) => {
					if (a[1].title < b[1].title) {
						return -1;
					}
					if (a[1].title > b[1].title) {
						return 1;
					}
					return 0;
				}),
			);
			setFilteredTasks(loadedTasksMassive);
			setIsLoading(false);
		});
	}, []);

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
