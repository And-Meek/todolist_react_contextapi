import { useDispatch, useSelector } from 'react-redux';
import { selectIsCreating } from '../../../selectors';
import { findTask } from '../../../actions/find-task';
import { sortTask } from '../../../actions/sort-task';

export const FindTask = () => {
	const { isCreating } = useSelector(selectIsCreating);
	const dispatch = useDispatch();
	const requestFindTask = ({ target }) => {
		dispatch(findTask(target.value.trim()));
	};

	const requestSortTask = () => {
		dispatch(sortTask());
	};

	return (
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
	);
};
