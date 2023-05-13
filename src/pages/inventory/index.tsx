import { Tabs } from 'antd'
import { toSentenceCase } from 'helpers/strings'
import React, { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const InventoryManagementContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const items = ['consumables', 'non-consumables', 'consumables-removed', 'non-consumables-removed']
	const current = useLocation().pathname.split('/').at(-1)
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