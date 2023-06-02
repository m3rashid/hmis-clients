import { Tabs } from 'antd'
import React, { useContext } from 'react'

import { uiContext } from 'src/context/ui'
import * as configs from 'src/pages/settings/configs'

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
				]}
			/>
		</>
	)
}

export default Settings
