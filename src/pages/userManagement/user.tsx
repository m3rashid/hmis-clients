import { TableProps, Tag } from 'antd';

import apiService from '../../api/service';
import TableHoc from '../../components/hocs/table';
import UserManagementContainer from '../../pages/userManagement';

const UserManagement = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{
			title: 'Email Verified',
			dataIndex: 'emailVerified',
			key: 'emailVerified',
			render: (entry) => (entry ? 'Yes' : 'No'),
		},
		{
			title: 'Roles',
			dataIndex: 'roles',
			key: 'roles',
			render: (entry) => (
				<div className="flex gap-2">
					{entry.map((t: any) => (
						<Tag>{t.displayName}</Tag>
					))}
				</div>
			),
		},
	];


	return (
		<UserManagementContainer>
			<TableHoc
			popupType='drawer'
				title="Users"
				addButtonLabel="Add User"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/auth/user/all', 'GET'),
					delete: apiService('/auth/user/delete'),
					edit: apiService('/auth/user/edit'),
				}}
				showTitle={false}
				modifyInfoDetails={(data) => {
					if (!data) return {};
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						if (key === 'roles') {
							return { ...acc, [key]: val.map((v: any) => v.displayName).join(', ') };
						}
						return { ...acc, [key]: val };
					}, {});
				}}
			/>
		</UserManagementContainer>
	);
};

export default UserManagement;
