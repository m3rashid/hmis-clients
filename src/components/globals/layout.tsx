import enUs from 'antd/locale/en_US'
import { useRecoilValue } from 'recoil'
import { ConfigProvider } from 'antd'
import configAtom from 'recoilAtoms/config'
import Brand from 'components/globals/brand'
import AuthActions from 'components/globals/authActions'
import NavigationMenu from 'components/globals/navigationMenu'
import GlobalSearch from 'components/globals/globalSearch'
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react'

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const config = useRecoilValue(configAtom)
	const [isMobile, setIsMobile] = useState(true)

	useLayoutEffect(() => {
		const setWindowWidth = () => {
			const windowWidth = window.innerWidth
			if (windowWidth > 576) setIsMobile(false)
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
					colorPrimary: config.appColors.primary,
					colorBgTextHover: config.appColors.primaryHover,
					colorFill: config.appColors.primary,
					controlOutline: 'none',
				},
			}}
			locale={enUs}
		>
			<div
				className={`h-[60px] gap-x-10 all-center fixed w-screen top-0 z-50 bg-gray-100 py-[10px] ${
					isMobile ? 'px-[10px]' : 'px-[20px]'
				}`}
			>
				<Brand inline onlyLogo={isMobile} />
				<div className='flex-1 all-center'>
					<NavigationMenu />
					<GlobalSearch />
				</div>
				<AuthActions {...{ isMobile }} />
			</div>

			<div
				style={{ minHeight: 'calc(100vh-60px)' }}
				className={`h-app overflow-y-auto overflow-x-hidden max-w-screen -z-10 mt-[60px] scroll-mt-[60px] ${
					isMobile ? 'p-[10px]' : 'p-[20px]'
				}`}
			>
				{children}
			</div>
		</ConfigProvider>
	)
}

export default AppLayout
