import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import { useState } from 'react'

import apiService from 'src/api/service'
import TableHoc from 'src/components/hocs/table'
import RoleDrawer from 'src/components/permissions/drawer'
import UserManagementContainer from 'src/pages/userManagement'

const RoleManagement = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [editPermission /* setEditPermission */] = useState<any>()

	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'displayName', key: 'displayName', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: [],
		properties: {},
	}

	return (
		<UserManagementContainer>
			<TableHoc
				title="Roles"
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
					get: apiService('/role/all', 'GET'),
				}}
				showTitle={false}
				formSchema={formSchema}
				modifyInfoDetails={(data) => {
					if (!data) return {};
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						if (key === 'permissions') return { ...acc };
						return { ...acc, [key]: val };
					}, {});
				}}
			/>
		</UserManagementContainer>
	);
}

export default RoleManagement
