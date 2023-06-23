import { Button, TableProps } from 'antd';
import { useState } from 'react';

import apiService from '../../api/service';
import TableHoc from '../..//components/hocs/table';
import RoleDrawer, { IPayload } from '../../components/permissions/drawer';
import UserManagementContainer from './index';

const RoleManagement = () => {
	const [editPermission /* setEditPermission */] = useState<any>();
	const [payload, setPayload] = useState<IPayload | null>(null);

	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	];

	return (
		<UserManagementContainer>
			<TableHoc
				title="Roles"
				addButtonLabel="Add Role"
				drawerProps={{
					width: '50vw',
				}}
				formChildren={<RoleDrawer {...{ data: editPermission, payload, setPayload }} />}
				onFinishFormValues={async () => {
					console.log({ payload });
				}}
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/role/all', 'GET'),
				}}
				showTitle={false}
				modifyInfoDetails={(data) => {
					if (!data) return {};
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						if (key === 'permissions') return { ...acc };
						return { ...acc, [key]: val };
					}, {});
				}}
			/>
		</UserManagementContainer>
	);
};

export default RoleManagement;
