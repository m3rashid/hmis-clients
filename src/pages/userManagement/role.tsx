import React from 'react'
import apiService from 'api/service'
import { TableProps, Tag } from 'antd'
import { RJSFSchema } from '@rjsf/utils'
import TableHoc from 'components/hocs/table'
import UserManagementContainer from 'pages/userManagement'

const RoleManagement = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{
			title: 'permissions',
			dataIndex: 'permissions',
			key: 'permissions',
			width: 170,
			render: entry => {
				return (
					<div className='flex gap-2 flex-col'>
						{entry.map((t: any) => (
							<Tag>{t.displayName}</Tag>
						))}
					</div>
				)
			},
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
				title='Roles'
				addButtonLabel='Add Role'
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('GET', '/role/all'),
					delete: apiService('POST', '/role/delete'),
					edit: apiService('POST', '/role/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
				modifyInfoDetails={data => {
					if (!data) return {}
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						if (key === 'permissions') {
							return {
								...acc,
								[key]: val.map((v: any) => v.displayName).join(', '),
							}
						}
						return { ...acc, [key]: val }
					}, {})
				}}
			/>
		</UserManagementContainer>
	)
}

export default RoleManagement
