import { TableProps } from 'antd';
import dayjs from 'dayjs';

import apiService from '../../api/service';
import TableHoc, { defaultTableAtomContents } from '../../components/table';
import { MODELS } from '@hmis/gatekeeper';
import { atom, useRecoilState } from 'recoil';
import { SelectedRowsAtom } from '../../components/table/types';


const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IConsumable>>({
	key: 'inventoryRemovedConsumable',
	default: defaultTableAtomContents<MODELS.IConsumable>(),
});


const RemovedConsumables = () => {
	const [
		// { selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);

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
		<>
			<TableHoc<MODELS.IConsumable>
				title="Removed Consumables"
				popupType="drawer"
				selectedRowsAtom={selectedRowsAtom}
				actionButtons={false}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
					pagination: {
						defaultPageSize: 15,
					},
				}}
				routes={{
					list: apiService('/inventory/consumable/all'),
					delete: apiService('/inventory/consumable/remove'),
				}}
				listBody={{
					query: { deleted: true },
					options: {
						$sort: { createdAt: -1 },
						lean: true,
					},
				}}
			/>
		</>
	);
};

export default RemovedConsumables;
