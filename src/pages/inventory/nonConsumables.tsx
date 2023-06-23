import dayjs from 'dayjs';
import { TableProps } from 'antd';
import { MODELS } from '@hmis/gatekeeper';

import apiService from '../../api/service';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/table';
import InventoryManagementContainer from './index';
import { atom, useRecoilState } from 'recoil';
import NonConsumableForm from '../../components/nonConsumableForm';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.INonConsumable>>({
	key: 'inventoryNonConsumable',
	default: defaultTableAtomContents<MODELS.INonConsumable>(),
});

const NonConsumables = () => {
	const [
		{ selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);
	const columns: TableProps<MODELS.INonConsumable>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
		{ title: 'Quantity', dataIndex: 'quantityLeft', key: 'quantityLeft', width: 80 },
		{
			title: 'Last Servicing Date',
			dataIndex: 'lastServicingDate',
			key: 'lastServicingDate',
			render: (t) => dayjs(t).format('DD-MM-YYYY HH:mm A'),
			width: 150,
		},
		{
			title: 'Next Servicing Date',
			dataIndex: 'nextServicingDate',
			key: 'nextServicingDate',
			render: (t) => dayjs(t).format('DD-MM-YYYY HH:mm A'),
			width: 150,
		},
	];

		const { ActionButtons, FormContainer } = NonConsumableForm({
			closeModal: () => setSelectedRows((p) => ({ ...p, formModalOpen: false })),
			editData: selectedRows[0],
		});

	return (
		<InventoryManagementContainer>
			<TableHoc<MODELS.INonConsumable>
				title="Non Consumables"
				addButtonLabel="Add Non Consumable"
				selectedRowsAtom={selectedRowsAtom}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				drawerProps={{
					footer: ActionButtons,
				}}
				form={FormContainer}
				editable
				popupType="drawer"
				routes={{
					list: apiService('/non-consumable/all', 'GET'),
					delete: apiService('/non-consumable/delete'),
				}}
			/>
		</InventoryManagementContainer>
	);
};

export default NonConsumables;
