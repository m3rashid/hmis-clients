import React from 'react'
import InventoryManagementContainer from 'pages/inventory'
import { TableProps } from 'antd'
import dayjs from 'dayjs'
import { RJSFSchema } from '@rjsf/utils'
import TableHoc from 'components/hocs/table'
import apiService from 'api/service'

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
					pagination: {
						defaultPageSize: 15,
					},
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
