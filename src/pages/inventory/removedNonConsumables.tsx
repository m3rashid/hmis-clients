import { TableProps } from 'antd';
import dayjs from 'dayjs';

import apiService from '../../api/service';
import TableHoc from '../../components/hocs/table';
import InventoryManagementContainer from './index';
import { MODELS } from '@hmis/gatekeeper';

const RemovedNonConsumables = () => {
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
				title="Removed Non Consumables"
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
					get: apiService('/inventory/non-consumable/removed', 'GET'),
					delete: apiService('/inventory/non-consumable/delete'),
					edit: apiService('/inventory/non-consumable/edit'),
				}}
				showTitle={false}
			/>
		</InventoryManagementContainer>
	);
};

export default RemovedNonConsumables;
