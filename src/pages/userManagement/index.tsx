import { Tabs } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { toSentenceCase } from 'helpers/strings'

const UserManagementContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const items = ['users', 'roles']
	const current = useLocation().pathname.split('/').at(-1)
	const navigate = useNavigate()

	return (
		<div>
			<Tabs
				centered
				defaultActiveKey={current}
				onChange={d => navigate(`/users-management/${d}`)}
				items={items.map(t => ({ key: t, label: toSentenceCase(t) }))}
			/>
			{children}
		</div>
	)
}

export default UserManagementContainer
