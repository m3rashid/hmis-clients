import { RJSFSchema } from '@rjsf/utils';
import { TableProps } from 'antd';
import dayjs from 'dayjs';

import apiService from '../../api/service';
import TableHoc from '../../components/hocs/table';
import InventoryManagementContainer from './index';
import type { MODELS } from '@hmis/gatekeeper';

const Consumables = () => {
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

	const formSchema: RJSFSchema = {
		type: 'object',
		properties: {
			name: { type: 'string', title: 'Name' },
			quantityLeft: { type: 'number', title: 'Quantity' },
			quantityPerUnit: { type: 'number', title: 'Qty Per Unit' },
			batchNumber: { type: 'string', title: 'Batch Number' },
			manufacturer: { type: 'string', title: 'Manufacturer' },
			expiryDate: { type: 'string', title: 'Expiry Date', format:'date' },
			lastOrderDate: { type: 'string', title: 'Last Servicing Date', format:'date' },
			nextOrderDate: { type: 'string', title: 'Next Servicing Date', format:'date' },
		},
		required: ['name', 'quantityLeft', 'quantityPerUnit'],
	};

	return (
		<InventoryManagementContainer>
			<TableHoc<MODELS.IConsumable>
				title="Consumables"
				addButtonLabel="Add Consumable"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('/inventory/consumable/all', 'GET'),
					delete: apiService('/inventory/consumable/delete'),
					edit: apiService('/inventory/consumable/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</InventoryManagementContainer>
	);
};

export default Consumables;
