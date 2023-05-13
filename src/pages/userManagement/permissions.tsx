import React, { useState } from 'react'
import apiService from 'api/service'
import { Table, TableProps, Tag } from 'antd'
import TableHoc from 'components/hocs/table'
import UserManagementContainer from 'pages/userManagement'
import { findPermission } from 'helpers/permission'
import { toSentenceCase } from 'helpers/strings'
import RoleDrawer from 'components/permissions/drawer'

const PermissionManagement = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [editPermission, setEditPermission] = useState<any>()

	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName', width: 200 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{
			title: 'Permissions',
			dataIndex: 'permissions',
			key: 'permissions',
			align: 'center',
			render: (permissions: any) => {
				return (
					<Table
						dataSource={permissions}
						pagination={false}
						bordered={false}
						scroll={{ x: 348 }}
						className='nested-permission-table'
						columns={[
							{
								dataIndex: 'resourceType',
								key: 'resourceType',
								render: res => <div style={{ minWidth: 90, width: '100%' }}>{res}</div>,
							},
							{
								dataIndex: 'scope',
								key: 'scope',
								render: scope => {
									return (
										<div style={{ minWidth: 120, width: '100%' }}>
											{scope?.map((t: string) => toSentenceCase(t)).join(', ')}
										</div>
									)
								},
							},
							{
								dataIndex: 'accessLevel',
								key: 'accessLevel',
								render: accessLevel => {
									const perms = findPermission(accessLevel)
									return (
										<div className='flex gap-2 flex-col' style={{ minWidth: 90, width: '100%' }}>
											{perms.map((t: any) => (
												<Tag>{toSentenceCase(t)}</Tag>
											))}
										</div>
									)
								},
							},
						]}
					/>
				)
			},
		},
	]

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
				modifyInfoDetails={data => {
					if (!data) return {}
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						// if (key === 'permissions') {
						// 	return {
						// 		...acc,
						// 		...val.map((v: any) => {
						// 			// {resourceType, scope, accesslevel, _id}
						// 		}),
						// 		// [key]: val.map((v: any) => v.displayName).join(', '),
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
