import { Tabs } from 'antd'
import * as configs from './configs'
import { uiContext } from 'context/ui'
import React, { useContext } from 'react'

const Settings = () => {
	const [{ isMobile }] = useContext(uiContext)
	return (
		<>
			<Tabs
				defaultActiveKey='1'
				centered
				tabPosition={isMobile ? 'top' : 'left'}
				style={{
					display: 'flex',
					alignItems: 'stretch',
					justifyContent: 'stretch',
					minHeight: 'calc(100vh - 200px)',
				}}
				items={[
					{
						key: '1',
						label: 'App Config',
						children: <configs.App />,
					},
					{
						key: '2',
						label: 'Colors Config',
						children: <configs.Colors />,
					},
				]}
			/>
		</>
	)
}

export default Settings
