import { TableProps } from 'antd';
import dayjs from 'dayjs';

import apiService from '../../api/service';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/table';
import InventoryManagementContainer from './index';
import type { MODELS } from '@hmis/gatekeeper';
import { atom, useRecoilState } from 'recoil';
import ConsumableForm from '../../components/consumableForm';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IConsumable>>({
	key: 'inventoryConsumable',
	default: defaultTableAtomContents<MODELS.IConsumable>(),
});

const Consumables = () => {
	const [{ selectedRows }, setSelectedRows] = useRecoilState(selectedRowsAtom);

	const columns: TableProps<MODELS.IConsumable>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
		{ title: 'Quantity Left', dataIndex: 'quantityLeft', key: 'quantityLeft', width: 150 },
		{
			title: 'Quantity Per Unit',
			dataIndex: 'quantityPerUnit',
			key: 'quantityPerUnit',
			width: 150,
		},
		{ title: 'Batch Number', dataIndex: 'batchNumber', key: 'batchNumber' },
		{
			title: 'ExpiryDate',
			dataIndex: 'expiryDate',
			key: 'expiryDate',
			render: (t) => dayjs(t).format('DD-MM-YYYY'),
			width: 100,
		},
		{ title: 'Manufacturer', dataIndex: 'manufacturer', key: 'manufacturer' },
	];

	const { ActionButtons, FormContainer } = ConsumableForm({
		closeModal: () => setSelectedRows((p) => ({ ...p, formModalOpen: false })),
		editData: selectedRows[0],
	});

	return (
		<InventoryManagementContainer>
			<TableHoc<MODELS.IConsumable>
				title="Consumables"
				selectedRowsAtom={selectedRowsAtom}
				addButtonLabel="Add Consumable"
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
					list: apiService('/consumable/all', 'GET'),
					delete: apiService('/consumable/delete'),
				}}
			/>
		</InventoryManagementContainer>
	);
};

export default Consumables;
