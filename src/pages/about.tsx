import { Tabs } from 'antd'
import React from 'react'

const About = () => {
	return (
		<div className='' style={{ minHeight: 'calc(100vh - 130px)' }}>
			<Tabs
				tabPosition='left'
				items={[
					{ label: 'Permissions', key: 'permissions', children: <div>Permissions</div> },
					{ label: 'Inventory', key: 'inventory', children: <div>Inventory</div> },
					{ label: 'Settings', key: 'settings', children: <div>Settings</div> },
				]}
			/>
		</div>
	)
}

export default About
