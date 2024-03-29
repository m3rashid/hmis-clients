import { DragDropContext } from 'react-beautiful-dnd';
import useTasks from '../../components/taskManagement/useTasks';

const TaskManagement = () => {
	const { onDragEnd } = useTasks();

	return (
		<div className="flex flex-col mx-2 h-screen">
			<div className="flex overflow-x-auto items-start gap-4 scrollbar">
				<DragDropContext onDragEnd={onDragEnd}>

				</DragDropContext>
			</div>
		</div>
	);
};

export default TaskManagement;
