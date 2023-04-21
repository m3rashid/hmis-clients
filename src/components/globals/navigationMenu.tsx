import React from 'react'
import { useRecoilValue } from 'recoil'
import configAtom from 'recoilAtoms/config'
import routes from 'components/globals/routes'
import { AppstoreOutlined } from '@ant-design/icons'

import { Menu, MenuProps, Popover, Typography } from 'antd'
interface IProps {
	collapsed?: boolean
}

const NavigationMenu: React.FC<IProps> = () => {
	const config = useRecoilValue(configAtom)

	const sidebarRoutes: MenuProps['items'] = routes.reduce((acc: any, route) => {
		if (route.showInNav === false) return [...acc]
		return [
			...acc,
			...[
				{
					key: route.link,
					icon: route.icon,
					label: config.sidebarStringMap[route.label] || route.label,
					...(!!route.nestedLinks && {
						children: route.nestedLinks?.map(nestedRoute => ({
							label: config.sidebarStringMap[nestedRoute.label] || nestedRoute.label,
							key: `${route.link}${nestedRoute.link}`,
							icon: nestedRoute.icon,
						})),
					}),
				},
			],
		]
	}, [])

	return (
		<Popover
			placement='bottomLeft'
			content={
				<Menu
					items={sidebarRoutes}
					mode='inline'
					className='bg-transparent border-0 p-0 m-0 w-64 md:w-96'
					multiple={false}
				/>
			}
		>
			<Typography.Text type='secondary'>
				<AppstoreOutlined className='text-2xl' />
			</Typography.Text>
		</Popover>
	)
}

export default NavigationMenu
