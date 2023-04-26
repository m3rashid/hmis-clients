import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import TableHoc from 'components/hocs/table'
import React from 'react'
import apiService from 'api/service'
import { toSentenceCase } from 'helpers/strings'
import UserManagementContainer from 'pages/userManagement/container'

const PermissionManagement = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName', width: 180 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ title: 'Resource Type', dataIndex: 'resourceType', key: 'resourceType', width: 100 },
		{ title: 'Scope', dataIndex: 'scope', key: 'scope', width: 100 },
		{
			title: 'Permission',
			dataIndex: 'permission',
			key: 'permission',
			width: 130,
			render: (entry: any) => toSentenceCase(entry),
		},
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: [],
		properties: {},
	}

	return (
		<UserManagementContainer>
			<TableHoc
				openModalButton={false}
				title='Permissions'
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					get: apiService('GET', '/permission/all'),
				}}
				showTitle={false}
				formSchema={formSchema}
			/>
		</UserManagementContainer>
	)
}

export default PermissionManagement
