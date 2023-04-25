import React from 'react'
import { TableProps } from 'antd'
import apiService from 'api/service'
import { RJSFSchema } from '@rjsf/utils'
import TableHoc from 'components/hocs/table'
import { toSentenceCase } from 'helpers/strings'
import { PERMISSION } from 'constants/enums'

const ResourceManagement = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ title: 'Type', dataIndex: 'type', key: 'type', render: t => toSentenceCase(t) },
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
					enum: PERMISSION.map(t => ({ value: t, label: toSentenceCase(t) })),
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
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('GET', '/resource/all'),
					delete: apiService('POST', '/resource/delete'),
					edit: apiService('POST', '/resource/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</div>
	)
}

export default ResourceManagement
