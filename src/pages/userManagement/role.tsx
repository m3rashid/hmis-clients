import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import TableHoc from 'components/hocs/table'
import React, { useEffect } from 'react'

const RoleManagement = () => {
	const columns: TableProps<any>['columns'] = []

	const getPermissions = async () => {}

	useEffect(() => {
		getPermissions().then().catch()
	}, [])

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
				title='Roles'
				addButtonLabel='Add Role'
				tableProps={{
					columns: columns,
					dataSource: [],
					style: {
						minHeight: '500px',
					},
				}}
				formBaseProps={{}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</div>
	)
}

export default RoleManagement
