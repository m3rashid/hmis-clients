import React, { useState } from 'react'
import apiService from 'api/service'
import { TableProps, Tag } from 'antd'
import { RJSFSchema } from '@rjsf/utils'
import TableHoc from 'components/hocs/table'
import UserManagementContainer from 'pages/userManagement'
import { findPermission } from 'helpers/permission'
import { toSentenceCase } from 'helpers/strings'
import RoleDrawer from 'components/permissions/drawer'

const PermissionManagement = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [editPermission, setEditPermission] = useState<any>()

	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ title: 'Resource Type', dataIndex: 'resourceType', key: 'resourceType' },
		{ title: 'Scope', dataIndex: 'scope', key: 'scope' },
		{
			title: 'Permissions',
			dataIndex: 'permission',
			key: 'permission',
			width: 170,
			render: entry => {
				const perms = findPermission(entry)
				return (
					<div className='flex gap-2 flex-col'>
						{perms.map((t: any) => (
							<Tag>{toSentenceCase(t)}</Tag>
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
				title='Permissions'
				actionButtons={
					<RoleDrawer
						{...{
							isOpen: isDrawerOpen,
							setIsOpen: setIsDrawerOpen,
							data: editPermission,
							isEdit: Object.keys(editPermission ?? {}).length > 0,
							onDrawerClose: () => {},
						}}
					/>
				}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('GET', '/permission/all'),
				}}
				showTitle={false}
				formSchema={formSchema}
				modifyInfoDetails={data => {
					if (!data) return {}
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						// if (key === 'permissions') {
						// 	return {
						// 		...acc,
						// 		[key]: val.map((v: any) => v.displayName).join(', '),
						// 	}
						// }
						return { ...acc, [key]: val }
					}, {})
				}}
			/>
		</UserManagementContainer>
	)
}

export default PermissionManagement
