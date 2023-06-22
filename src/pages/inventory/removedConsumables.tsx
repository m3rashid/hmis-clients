import { TableProps } from 'antd';
import dayjs from 'dayjs';

import apiService from '../../api/service';
import TableHoc from '../../components/hocs/table';
import InventoryManagementContainer from './index';
import { MODELS } from '@hmis/gatekeeper';

const RemovedConsumables = () => {
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
				title="Removed Consumables"
				actionButtons={false}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
					pagination: {
						defaultPageSize: 15,
					},
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('/inventory/consumable/removed', 'GET'),
					delete: apiService('/inventory/consumable/delete'),
					edit: apiService('/inventory/consumable/edit'),
				}}
				showTitle={false}
			/>
		</InventoryManagementContainer>
	);
};

export default RemovedConsumables;
