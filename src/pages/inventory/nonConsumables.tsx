import dayjs from 'dayjs';
import { TableProps } from 'antd';
import { MODELS, inventoryValidator } from '@hmis/gatekeeper';

import apiService from '../../api/service';
import TableHoc from '../../components/table';
import InventoryManagementContainer from './index';
import NonConsumableForm from '../../components/nonConsumableForm';
import { INonConsumable } from '@hmis/gatekeeper/dist/models/index';
import useTableForm from '../../components/form/useTableForm';

const NonConsumables = () => {
	const { ActionButtons, editData, form, isEdit, selectedRowsAtom } = useTableForm<INonConsumable>({
		add: {
			endpoint: '/non-consumable/add',
			validatorSchema: inventoryValidator.createNonConsumableSchema,
		},
		update: {
			endpoint: '/non-consumable/edit',
			validatorSchema: inventoryValidator.updateNonConsumableSchema,
		},
		atomKey: 'inventoryNonConsumable',
		okActionButtonLabel: 'Confirm Non-Consumable',
	});

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
				form={<NonConsumableForm editData={editData} form={form} isEdit={isEdit} />}
				editable
				popupType="drawer"
				routes={{
					list: apiService('/non-consumable/all'),
					delete: apiService('/non-consumable/delete'),
				}}
				listBody={{
					query: { deleted: false },
					options: {
						$sort: { createdAt: -1 },
						lean: true,
					},
				}}
			/>
		</InventoryManagementContainer>
	);
};

export default NonConsumables;
