import React from 'react'
import { Tabs } from 'antd'
import { useRecoilValue } from 'recoil'
import uiAtom from 'recoilAtoms/ui'
import * as configs from './configs'

const Settings = () => {
	const { isMobile } = useRecoilValue(uiAtom)
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
						label: 'App Colors',
						children: <configs.AppColor />,
					},
					{
						key: '3',
						label: 'Theme Colors',
						children: <configs.ThemeColor />,
					},
				]}
			/>
		</>
	)
}

export default Settings
