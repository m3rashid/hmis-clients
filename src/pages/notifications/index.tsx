import { TableProps } from 'antd';

import apiService from '../../api/service';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/table';
import { atom, useRecoilState } from 'recoil';
import NoticeForm from '../../components/noticeForm';
import { Fragment } from 'react';

const selectedRowsAtom = atom<SelectedRowsAtom<any>>({
	key: 'notifications',
	default: defaultTableAtomContents<any>(),
});

const Notifications = () => {
	const [{ selectedRows }, setSelectedRows] = useRecoilState(selectedRowsAtom);

	const columns: TableProps<any>['columns'] = [
		{ title: 'Title', dataIndex: 'title', key: 'title', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	];

	const { ActionButtons, FormContainer } = NoticeForm({
		closeModal: () => setSelectedRows((p) => ({ ...p, formModalOpen: false })),
		editData: selectedRows[0],
	});

	return (
		<Fragment>
			<TableHoc
				title="Notifications"
				addButtonLabel="New Notification"
				selectedRowsAtom={selectedRowsAtom}
				modalProps={{
					footer: ActionButtons,
				}}
				form={FormContainer}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				popupType="modal"
				editable
				routes={{
					list: apiService('/notification/all', 'GET'),
					delete: apiService('/notification/delete'),
				}}
			/>
		</Fragment>
	);
};

export default Notifications;
