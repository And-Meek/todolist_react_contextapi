import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../actions/add-task';
import { useState } from 'react';
import { selectError, selectIsCreating } from '../../../selectors';

export const CreateTask = () => {
	const error = useSelector(selectError);
	const isCreating = useSelector(selectIsCreating);
	const [newTask, setNewTask] = useState('');
	const dispatch = useDispatch();

	const handlerNewTask = ({ target }) => {
		dispatch({
			type: 'SET_ERROR',
			payload: false,
		});
		setNewTask(target.value);
	};

	const useRequestAddTask = () => {
		dispatch(addTask(newTask));
		setNewTask('');
	};

	return (
		<>
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
					onClick={useRequestAddTask}
					disabled={isCreating}
				>
					Добавить
				</button>
			</div>
		</>
	);
};
