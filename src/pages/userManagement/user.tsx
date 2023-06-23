import { TableProps, Tag } from 'antd';

import apiService from '../../api/service';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/hocs/table';
import UserManagementContainer from '../../pages/userManagement';
import { atom, useRecoilState } from 'recoil';
import { MODELS } from '@hmis/gatekeeper';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IUser>>({
	key: 'userManagementUser',
	default: defaultTableAtomContents<MODELS.IUser>(),
});

const UserManagement = () => {
	const [
		// { selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);

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
			<TableHoc<MODELS.IUser>
				popupType="drawer"
				title="Users"
				selectedRowsAtom={selectedRowsAtom}
				addButtonLabel="Add User"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/auth/user/all', 'GET'),
					delete: apiService('/auth/user/delete'),
				}}
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
