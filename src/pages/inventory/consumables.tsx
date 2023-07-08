import { TableProps } from 'antd';
import dayjs from 'dayjs';

import apiService from '../../api/service';
import TableHoc from '../../components/table';
import InventoryManagementContainer from './index';
import { inventoryValidator, type MODELS } from '@hmis/gatekeeper';
import ConsumableForm from '../../components/consumableForm';
import useTableForm from '../../components/form/useTableForm';
import { IConsumable } from '@hmis/gatekeeper/dist/models/index';

const Consumables = () => {
	const { ActionButtons, editData, form, isEdit, selectedRowsAtom } = useTableForm<IConsumable>({
		add: {
			endpoint: '/consumable/add',
			validatorSchema: inventoryValidator.createConsumableSchema,
		},
		update: {
			endpoint: '/consumable/edit',
			validatorSchema: inventoryValidator.updateConsumableSchema,
		},
		atomKey: 'inventoryConsumable',
		okActionButtonLabel: 'Confirm Consumable',
	});

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
				form={<ConsumableForm editData={editData} form={form} isEdit={isEdit} />}
				editable
				popupType="drawer"
				routes={{
					list: apiService('/inventory/consumable/all'),
					delete: apiService('/inventory/consumable/delete'),
				}}
				listBody={{
					query: { deleted: false },
					options: { $sort: { createdAt: -1 }, lean: true },
				}}
			/>
		</InventoryManagementContainer>
	);
};

export default Consumables;
