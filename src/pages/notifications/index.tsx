import { TableProps } from 'antd';

import apiService from '../../api/service';
import TableHoc from '../../components/hocs/table';

const Notifications = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Title', dataIndex: 'title', key: 'title', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	];

	// 		title: { type: 'string', title: 'Title' },
	// 		description: { type: 'string', title: 'Description', format: 'textarea'	},
	// 	required: ['title', 'description'],

	const handleFormSubmit = async () => {
	};

	return (
		<>
			<TableHoc
				title="Notifications"
				addButtonLabel="New Notification"
				modalProps={{
					title: 'New Notification',
					width: 600,
				}}
				onFinishFormValues={handleFormSubmit}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				popupType="drawer"
				routes={{
					list: apiService('/notification/all', 'GET'),
					create: apiService('/notification'),
				}}
			/>
		</>
	);
};

export default Notifications;
