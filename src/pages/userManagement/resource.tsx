import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import dayjs from 'dayjs'
import TableHoc from 'hocs/table'
import React from 'react'

const ResourceManagement = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ title: 'Type', dataIndex: 'type', key: 'type' },
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: text => dayjs(text).format('DD-MM-YYYY'),
		},
		{
			title: 'Last Updated',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: text => dayjs(text).format('DD-MM-YYYY'),
		},
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: [],
		properties: {
			name: { type: 'string', title: 'Name' },
			description: { type: 'string', title: 'Description', format: 'textarea' },
			permissions: {
				type: 'array',
				title: 'Permissions',
				items: {
					type: 'string',
					enum: [
						{ value: 'foo', label: 'Foo' },
						{ value: 'bar', label: 'Bar' },
						{ value: 'fuzz', label: 'Fuzz' },
						{ value: 'qux', label: 'Qux' },
					],
				},
				uniqueItems: true,
			},
		},
	}

	return (
		<div>
			<TableHoc
				title='Resources'
				addButtonLabel='Add Resource'
				tableProps={{
					columns: columns,
				}}
				formBaseProps={{}}
				routes={{
					get: '/resource/all',
				}}
				showTitle={false}
				formSchema={formSchema}
				ActionButtons={<></>}
			/>
		</div>
	)
}

export default ResourceManagement
