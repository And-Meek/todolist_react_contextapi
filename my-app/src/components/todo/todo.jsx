import { useContext } from 'react';
import { AppContext } from '../../context';
export const Todo = () => {
	const {
		filteredTasks,
		isUpdating,
		handlerUpdateTask,
		isCreating,
		clickOnUpdateTask,
		requestDeleteTask,
		updateBtnRef,
		updatedInputRef,
		idRef,
	} = useContext(AppContext);
	return filteredTasks.map(({ id, title }) => (
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
	));
};
