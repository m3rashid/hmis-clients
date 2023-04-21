import React from 'react'
import routes from 'components/globals/routes'
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined } from '@ant-design/icons'
import { Menu, MenuProps, Popover, Typography } from 'antd'

interface IProps {
	collapsed?: boolean
}

const NavigationMenu: React.FC<IProps> = () => {
	const navigate = useNavigate()

	const sidebarRoutes: MenuProps['items'] = routes.reduce((acc: any, route) => {
		if (route.showInNav === false) return [...acc]
		return [
			...acc,
			...[
				{
					key: route.link,
					icon: route.icon,
					label: route.label,
					...(!!route.nestedLinks && {
						children: route.nestedLinks?.map(nestedRoute => ({
							label: nestedRoute.label,
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
					theme='light'
					className='bg-transparent border-0 p-0 m-0 w-64 md:w-96'
					multiple={false}
					onClick={({ key }) => navigate(key)}
				/>
			}
		>
			<Typography.Text type='secondary' className='cursor-pointer'>
				<AppstoreOutlined className='text-2xl' />
			</Typography.Text>
		</Popover>
	)
}

export default NavigationMenu