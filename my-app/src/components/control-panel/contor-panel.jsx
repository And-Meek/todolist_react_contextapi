import { CreateTask } from './create-task/create-task';
import { FindTask } from './find-task/find-task';

export const ControlPanel = () => {
	return (
		<>
			<CreateTask />
			<FindTask />
		</>
	);
};
