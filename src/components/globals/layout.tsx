import enUs from 'antd/locale/en_US'
import { useRecoilValue } from 'recoil'
import { ConfigProvider } from 'antd'
import configAtom from 'recoilAtoms/config'
import Brand from 'components/globals/brand'
import AuthActions from 'components/globals/authActions'
import NavigationMenu from 'components/globals/navigationMenu'
import ApplicationSearch from 'components/globals/applicationSearch'
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react'

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const config = useRecoilValue(configAtom)
	const [width, setWidth] = useState(0)

	useLayoutEffect(() => {
		const setWindowWidth = () => {
			const windowWidth = window.innerWidth
			setWidth(windowWidth)
		}
		setWindowWidth()
		window.addEventListener('resize', setWindowWidth)
		return () => window.removeEventListener('resize', setWindowWidth)
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
			<div className='p-[10px] h-[60px] gap-x-10 all-center fixed w-screen top-0 z-50 bg-gray-100'>
				<Brand inline onlyLogo={width < 576} />
				<div className='flex-1 all-center'>
					<NavigationMenu />
					<ApplicationSearch />
				</div>

				<AuthActions {...{ width }} />
			</div>
			<div className='h-app overflow-auto p-[10px] min-h-screen pt-[70px] -z-10'>{children}</div>
		</ConfigProvider>
	)
}

export default AppLayout
