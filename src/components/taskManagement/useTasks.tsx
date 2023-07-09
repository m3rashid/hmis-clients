import { useQuery } from '@tanstack/react-query';
import { DropResult } from 'react-beautiful-dnd';
import apiService from '../../api/service';

const useTasks = () => {
	const getTasks = useQuery({
		queryKey: ['tasks'],
		queryFn: () => apiService('/')({}),
	});

	const onDragEnd = async (result: DropResult) => {
		console.log(result);
		return;
	};

	return {
		onDragEnd,
		getTasks,
	};
};

export default useTasks;
