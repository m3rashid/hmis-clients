import { TableProps } from 'antd';

import apiService from '../../api/service';
import TableHoc from '../../components/table';
import NoticeForm from '../../components/announcementForm';
import { Fragment } from 'react';
import useTableForm from '../../components/form/useTableForm';
import { announcementValidator } from '@hmis/gatekeeper';

const Notifications = () => {
	const { form, selectedRowsAtom, ActionButtons, editData, isEdit } = useTableForm({
		atomKey: 'notifications',
		okActionButtonLabel: 'Confirm Notification',
		add: {
			endpoint: '/notification/add',
			validatorSchema: announcementValidator.createAnnouncementSchema,
		},
		update: {
			endpoint: '/notification/update',
			validatorSchema: announcementValidator.updateAnnouncementSchema,
		},
	});

	const columns: TableProps<any>['columns'] = [
		{ title: 'Title', dataIndex: 'title', key: 'title', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	];

	return (
		<Fragment>
			<TableHoc
				title="Announcements"
				addButtonLabel="New Announcement"
				selectedRowsAtom={selectedRowsAtom}
				modalProps={{
					footer: ActionButtons,
				}}
				form={<NoticeForm editData={editData} form={form} isEdit={isEdit} />}
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
