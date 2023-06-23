import { TableProps } from 'antd';

import apiService from '../../api/service';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/hocs/table';
import { atom, useRecoilState } from 'recoil';

const selectedRowsAtom = atom<SelectedRowsAtom<any>>({
	key: 'notifications',
	default: defaultTableAtomContents<any>(),
});


const Notifications = () => {
	const [
		// { selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);

	const columns: TableProps<any>['columns'] = [
		{ title: 'Title', dataIndex: 'title', key: 'title', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	];

	// 		title: { type: 'string', title: 'Title' },
	// 		description: { type: 'string', title: 'Description', format: 'textarea'	},
	// 	required: ['title', 'description'],


	return (
		<>
			<TableHoc
				title="Notifications"
				addButtonLabel="New Notification"
				selectedRowsAtom={selectedRowsAtom}
				modalProps={{
					title: 'New Notification',
					width: 600,
				}}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				popupType="drawer"
				routes={{
					list: apiService('/notification/all', 'GET'),
				}}
			/>
		</>
	);
};

export default Notifications;
