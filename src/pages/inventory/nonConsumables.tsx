import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import dayjs from 'dayjs'

import apiService from 'src/api/service'
import TableHoc from 'src/components/hocs/table'
import InventoryManagementContainer from 'src/pages/inventory'

const NonConsumables = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
		{ title: 'Quantity', dataIndex: 'quantityLeft', key: 'quantityLeft', width: 80 },
		{
			title: 'Last Servicing Date',
			dataIndex: 'lastServicingDate',
			key: 'lastServicingDate',
			render: t => dayjs(t).format('DD-MM-YYYY HH:mm A'),
			width: 150,
		},
		{
			title: 'Next Servicing Date',
			dataIndex: 'nextServicingDate',
			key: 'nextServicingDate',
			render: t => dayjs(t).format('DD-MM-YYYY HH:mm A'),
			width: 150,
		},
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: [],
		properties: {},
	}

	return (
		<InventoryManagementContainer>
			<TableHoc
				title='Non Consumables'
				addButtonLabel='Add Non Consumable'
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('/inventory/non-consumable/all', 'GET'),
					delete: apiService('/inventory/non-consumable/delete'),
					edit: apiService('/inventory/non-consumable/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</InventoryManagementContainer>
	)
}

export default NonConsumables
