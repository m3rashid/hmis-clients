import { TableProps, Tag } from 'antd';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import { atom, useRecoilState } from 'recoil';
import { SelectedRowsAtom } from '../../components/table/types';
import UserManagementContainer from '../../pages/userManagement';
import TableHoc, { defaultTableAtomContents } from '../../components/table';

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
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (entry) => <Tag>{entry.name}</Tag>,
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
					list: apiService('/user/user/all'),
					delete: apiService('/user/user/remove'),
				}}
				modifyInfoDetails={(data) =>
					Object.entries((data || {})).reduce(
						(acc, [key, val]) => ({
							...acc,
							[key]: key === 'role' ? val.name : val,
						}),
						{}
					)
				}
				listBody={{
					query: {
						deleted: false,
						origin: 'INTERNAL',
					},
					options: {
						$sort: { createdAt: -1 },
						lean: true,
						populate: ['role'],
					},
				}}
			/>
		</UserManagementContainer>
	);
};

export default UserManagement;
