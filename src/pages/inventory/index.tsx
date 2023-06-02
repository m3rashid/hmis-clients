import { Tabs } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { toSentenceCase } from 'src/helpers/strings'

const InventoryManagementContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const items = ['consumables', 'non-consumables', 'consumables-removed', 'non-consumables-removed']
	const paths = useLocation().pathname.split('/')
	const current = paths[paths.length - 1]
	const navigate = useNavigate()
	return (
		<div>
			<Tabs
				centered
				defaultActiveKey={current}
				onChange={d => navigate(`/inventory/${d}`)}
				items={items.map(t => ({ key: t, label: toSentenceCase(t, '-') }))}
			/>
			{children}
		</div>
	)
}

export default InventoryManagementContainer
