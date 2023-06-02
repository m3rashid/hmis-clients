import { RJSFSchema } from '@rjsf/utils'
import { TableProps, Tag } from 'antd'

import apiService from 'src/api/service'
import TableHoc from 'src/components/hocs/table'
import UserManagementContainer from 'src/pages/userManagement'

const UserManagement = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{
			title: 'Email Verified',
			dataIndex: 'emailVerified',
			key: 'emailVerified',
			render: entry => (entry ? 'Yes' : 'No'),
		},
		{
			title: 'Roles',
			dataIndex: 'roles',
			key: 'roles',
			render: entry => (
				<div className='flex gap-2'>
					{entry.map((t: any) => (
						<Tag>{t.displayName}</Tag>
					))}
				</div>
			),
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
				title='Users'
				addButtonLabel='Add User'
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('GET', '/auth/user/all'),
					delete: apiService('POST', '/auth/user/delete'),
					edit: apiService('POST', '/auth/user/edit'),
				}}
				showTitle={false}
				formSchema={formSchema}
				modifyInfoDetails={data => {
					if (!data) return {}
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						if (key === 'roles') {
							return { ...acc, [key]: val.map((v: any) => v.displayName).join(', ') }
						}
						return { ...acc, [key]: val }
					}, {})
				}}
			/>
		</UserManagementContainer>
	)
}

export default UserManagement
