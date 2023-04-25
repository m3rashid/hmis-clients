import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import TableHoc from 'components/hocs/table'
import React from 'react'
import { PERMISSION } from 'constants/enums'
import { toSentenceCase } from 'helpers/strings'

const PermissionManagement = () => {
	const columns: TableProps<any>['columns'] = []

	const formSchema: RJSFSchema = {
		type: 'object',
		required: [],
		properties: {
			name: { type: 'string', title: 'Name' },
			description: { type: 'string', title: 'Description' },
			type: { type: 'string', title: 'Type' },
			scope: { type: 'string', title: 'Scope' },
			permission: {
				type: 'string',
				title: 'Permission',
				oneOf: PERMISSION.map(t => ({ const: t, title: toSentenceCase(t) })),
			},
		},
	}

	return (
		<div>
			<TableHoc
				title='Permissions'
				addButtonLabel='Add Permission'
				tableProps={{
					columns: columns,
					dataSource: [],
					style: {
						minHeight: '500px',
					},
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</div>
	)
}

export default PermissionManagement
