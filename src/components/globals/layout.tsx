import enUs from 'antd/locale/en_US'
import { useRecoilState, useRecoilValue } from 'recoil'
import React, { PropsWithChildren, useState } from 'react'
import { ConfigProvider, Image, Layout, Menu, MenuProps, Typography } from 'antd'

import uiAtom from 'recoilAtoms/ui'
import configAtom from 'recoilAtoms/config'
import routes from 'components/globals/routes'
import { useNavigate } from 'react-router-dom'
import UserTop from 'components/globals/userTop'

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const navigate = useNavigate()
	const config = useRecoilValue(configAtom)
	const [ui, setUi] = useRecoilState(uiAtom)
	const [currentMenuItem, setCurrentMenuItem] = useState('')

	const handleMenuChange = ({ key }: { key: string }) => {
		setCurrentMenuItem(key)
		navigate(key)
	}

	const sidebarRoutes: MenuProps['items'] = routes.reduce((acc: any, route) => {
		if (route.showInNav === false) return [...acc]
		return [
			...acc,
			...[
				{
					key: route.link,
					icon: route.icon,
					label: config.sidebarStringMap[route.label] || route.label,
					style: {
						color: config.colors.lightFg,
						...(currentMenuItem === route.link && {
							background: config.colors.primary,
						}),
					},
					...(!!route.nestedLinks && {
						children: route.nestedLinks?.map(nestedRoute => ({
							label: config.sidebarStringMap[nestedRoute.label] || nestedRoute.label,
							key: `${route.link}${nestedRoute.link}`,
							icon: nestedRoute.icon,
							style: {
								color: config.colors.lightFg,
								...(currentMenuItem === `${route.link}${nestedRoute.link}` && {
									background: config.colors.primary,
								}),
							},
						})),
					}),
				},
				...(route.dividerBottom
					? [
							{
								type: 'divider',
								style: {
									background: config.colors.lightFg,
									opacity: 0.3,
									width: '90%',
									margin: '0 auto',
								},
							},
					  ]
					: []),
			],
		]
	}, [])

	const defaultOpenKeys = routes.reduce((acc: any, route) => {
		if (route.initiallyOpened) return [...acc, route.link]
		if (!route.nestedLinks || !route.showInNav) return [...acc]
		return [...acc]
	}, [])

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Poppins, sans-serif',
					colorPrimary: config.colors.primary,
					colorBgTextHover: config.colors.primary,
					colorFill: config.colors.primary,
					controlOutline: 'none',
				},
			}}
			locale={enUs}
		>
			<Layout className='h-screen overflow-y-hidden'>
				{/* TODO: open like drawer on mobile instead of suppressing the right container  */}
				<Layout.Sider
					breakpoint='lg'
					collapsedWidth='0'
					onBreakpoint={broken => {
						// console.log({broken});
						setUi(prev => ({ ...prev, isMobile: broken }))
					}}
					onCollapse={(collapsed, type) => {
						// console.log({collapsed, type});
						setUi(prev => ({ ...prev, sidebarCollapsed: collapsed }))
					}}
					zeroWidthTriggerStyle={{
						background: config.colors.darkBg,
						opacity: 1,
						marginTop: '64px',
					}}
					style={{
						background: config.colors.darkBg,
						...(ui.isMobile && {
							position: 'fixed',
							zIndex: 5,
							height: '100%',
							bottom: 0,
						}),
					}}
				>
					<div className='h-[64px] flex justify-center'>
						<Image className='h-[54px] w-[54px]' src='' preview={false} />
						<Typography.Title
							level={3}
							style={{ color: 'white' }}
							className={`h-full flex items-center ${ui.isMobile ? 'pl-2' : 'justify-center'}`}
						>
							{config.appName}
						</Typography.Title>
					</div>

					<Menu
						mode='inline'
						defaultOpenKeys={defaultOpenKeys}
						style={{ background: config.colors.darkBg }}
						items={sidebarRoutes}
						onClick={handleMenuChange}
					/>
				</Layout.Sider>
				<Layout style={{ backgroundColor: config.colors.lightBg }}>
					<Layout.Header
						className='p-0'
						style={{
							background: config.colors.darkBg,
							...(!(ui.isMobile || ui.sidebarCollapsed) ? { paddingRight: '20px' } : {}),
						}}
					>
						<div className='h-[64px] flex items-center justify-center gap-5 flex-row px-2 m-0'>
							{ui.isMobile || ui.sidebarCollapsed ? (
								<>
									<Typography.Title level={3} style={{ color: 'white' }} className='flex-1 mt-3'>
										{config.appName}
									</Typography.Title>
									<div>hello world</div>
								</>
							) : (
								<>
									<div className='flex-1' />
									<UserTop />
								</>
							)}
						</div>
					</Layout.Header>
					<Layout.Content className={`${ui.isMobile ? 'm-[8px]' : 'm-[12px]'} mb-0 rounded-md`}>
						<div
							className={`${
								ui.isMobile ? 'p-[8px]' : 'p-[12px]'
							} min-h-[360px] h-full overflow-auto`}
							style={{ background: config.colors.lightFg }}
						>
							{children}
						</div>
					</Layout.Content>
					<Layout.Footer
						style={{ backgroundColor: config.colors.lightBg }}
						className='text-center py-3'
					>
						{config.appName} &copy; {new Date().getFullYear()} - All Rights Reserved
					</Layout.Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}

export default AppLayout
