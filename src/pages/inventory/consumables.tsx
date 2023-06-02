import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import dayjs from 'dayjs'

import apiService from 'src/api/service'
import TableHoc from 'src/components/hocs/table'
import InventoryManagementContainer from 'src/pages/inventory'

const Consumables = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
		{ title: 'Quantity Left', dataIndex: 'quantityLeft', key: 'quantityLeft' },
		{ title: 'Quantity Per Unit', dataIndex: 'quantityPerUnit', key: 'quantityPerUnit' },
		{ title: 'Batch Number', dataIndex: 'batchNumber', key: 'batchNumber' },
		{
			title: 'ExpiryDate',
			dataIndex: 'expiryDate',
			key: 'expiryDate',
			render: t => dayjs(t).format('DD-MM-YYYY'),
			width: 100,
		},
		{ title: 'Manufacturer', dataIndex: 'manufacturer', key: 'manufacturer' },
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: [],
		properties: {},
	}

	return (
		<InventoryManagementContainer>
			<TableHoc
				title='Consumables'
				addButtonLabel='Add Consumable'
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('GET', '/inventory/consumable/all'),
					delete: apiService('POST', '/inventory/consumable/delete'),
					edit: apiService('POST', '/inventory/consumable/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</InventoryManagementContainer>
	)
}

export default Consumables
