import React from 'react'
import InventoryManagementContainer from 'pages/inventory'
import { TableProps } from 'antd'
import dayjs from 'dayjs'
import { RJSFSchema } from '@rjsf/utils'
import TableHoc from 'components/hocs/table'
import apiService from 'api/service'
import { toSentenceCase } from 'helpers/strings'

const RemovedNonConsumables = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
		{ title: 'Type', dataIndex: 'type', key: 'type', render: t => toSentenceCase(t), width: 80 },
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
				title='Removed Non Consumables'
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
					get: apiService('GET', '/inventory/non-consumable/removed'),
					delete: apiService('POST', '/inventory/non-consumable/delete'),
					edit: apiService('POST', '/inventory/non-consumable/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</InventoryManagementContainer>
	)
}

export default RemovedNonConsumables
