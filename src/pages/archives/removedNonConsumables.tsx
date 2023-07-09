import dayjs from 'dayjs';
import ArchiveContainer from '.';
import { TableProps } from 'antd';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import { atom, useRecoilState } from 'recoil';
import { SelectedRowsAtom } from '../../components/table/types';
import TableHoc, { defaultTableAtomContents } from '../../components/table';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.INonConsumable>>({
	key: 'inventoryRemovedNonConsumables',
	default: defaultTableAtomContents<MODELS.INonConsumable>(),
});

const RemovedNonConsumables = () => {
	const [
		// { selectedRows }, setSelectedRows
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

	return (
		<ArchiveContainer>
			<TableHoc<MODELS.INonConsumable>
				title="Removed Non Consumables"
				popupType="drawer"
				selectedRowsAtom={selectedRowsAtom}
				actionButtons={false}
				recover
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
					pagination: {
						defaultPageSize: 15,
					},
				}}
				routes={{
					list: apiService('/inventory/non-consumable/all'),
					delete: apiService('/inventory/non-consumable/recover'),
				}}
				listBody={{
					query: { deleted: true },
					options: {
						$sort: { createdAt: -1 },
						lean: true,
					},
				}}
			/>
		</ArchiveContainer>
	);
};

export default RemovedNonConsumables;
