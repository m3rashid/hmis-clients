import { TableProps } from 'antd';
import apiService from '../../api/service';
import UserManagementContainer from './index';
import { atom, useRecoilState } from 'recoil';
import { toSentenceCase } from '../../helpers/strings';
import RoleDrawer from '../../components/permissions/drawer';
import { MODELS, transformPermission } from '@hmis/gatekeeper';
import { SelectedRowsAtom } from '../../components/table/types';
import TableHoc, { defaultTableAtomContents } from '../../components/table';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IRole>>({
	key: 'userManagementRole',
	default: defaultTableAtomContents<MODELS.IRole>(),
});

const RoleManagement = () => {
	const [{ selectedRows }, setSelectedRows] = useRecoilState(selectedRowsAtom);

	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name', width: 250 },
	];

	const { ActionButtons, FormContainer } = RoleDrawer({
		closeModal: () => setSelectedRows((p) => ({ ...p, formModalOpen: false, selectedRows: [] })),
		editData: selectedRows[0],
	});

	return (
		<UserManagementContainer>
			<TableHoc<MODELS.IRole>
				title="Roles"
				addButtonLabel="Add Role"
				selectedRowsAtom={selectedRowsAtom}
				drawerProps={{
					width: '50vw',
					footer: ActionButtons,
				}}
				editable
				form={FormContainer}
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/role/role/all'),
				}}
				modifyInfoDetails={(data) =>
					Object.entries(data?.permissions || {}).reduce<Record<string, string>>(
						(acc, [key, val]) => ({
							...acc,
							[toSentenceCase(key)]: transformPermission(val as any)
								.map((t) => toSentenceCase(t))
								.join(' + '),
						}),
						{}
					)
				}
				infoModalProps={{ title: 'Role Permissions' }}
				listBody={{
					query: {},
					options: {
						$sort: { createdAt: -1 },
						lean: true,
						populate: ['permissions'],
					},
				}}
			/>
		</UserManagementContainer>
	);
};

export default RoleManagement;
