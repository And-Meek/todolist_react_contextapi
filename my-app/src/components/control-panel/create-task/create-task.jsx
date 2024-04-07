import { useContext } from 'react';
import { AppContext } from '../../../context';
export const CreateTask = () => {
	const { error, handlerNewTask, newTask, isCreating, requestAddTask } =
		useContext(AppContext);
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
					onClick={requestAddTask}
					disabled={isCreating}
				>
					Добавить
				</button>
			</div>
		</>
	);
};
