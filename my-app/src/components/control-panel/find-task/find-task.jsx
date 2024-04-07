import { useContext } from 'react';
import { AppContext } from '../../../context';

export const FindTask = () => {
	const { requestFindTask, requestSortTask, isCreating } = useContext(AppContext);
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
