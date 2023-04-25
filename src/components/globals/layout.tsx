import enUs from 'antd/locale/en_US'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ConfigProvider, theme } from 'antd'
import configAtom from 'recoilAtoms/config'
import Brand from 'components/globals/brand'
import AuthActions from 'components/globals/authActions'
import NavigationMenu from 'components/globals/navigationMenu'
import GlobalSearch from 'components/globals/globalSearch'
import React, { PropsWithChildren, useLayoutEffect } from 'react'
import uiAtom from 'recoilAtoms/ui'

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const config = useRecoilValue(configAtom)
	const [{ isMobile }, setIsMobile] = useRecoilState(uiAtom)

	useLayoutEffect(() => {
		const setWindowWidth = () => {
			const windowWidth = window.innerWidth
			if (windowWidth > 576) setIsMobile(prev => ({ ...prev, isMobile: false }))
			else setIsMobile(prev => ({ ...prev, isMobile: true }))
		}
		setWindowWidth()
		window.addEventListener('resize', setWindowWidth)
		return () => window.removeEventListener('resize', setWindowWidth)
	}, [])

	const isDarkMode = config.app.theme === 'dark'

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Poppins, sans-serif',
					colorPrimary: config.appColors.primary,
					colorBgTextHover: isDarkMode
						? config.appColors.primaryHoverDark
						: config.appColors.primaryHoverLight,
					colorFill: config.appColors.primary,
					controlOutline: 'none',
				},
				algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
				// TODO: configure the default dark theme
			}}
			locale={enUs}
		>
			<div
				className={`h-[60px] gap-x-10 all-center fixed w-screen top-0 z-50 py-[10px] ${
					isMobile ? 'px-[10px]' : 'px-[20px]'
				} ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
			>
				<Brand onlyLogo={isMobile} />
				<div className='flex-1 all-center'>
					<NavigationMenu />
					<GlobalSearch />
				</div>
				<AuthActions {...{ isMobile }} />
			</div>

			<div
				style={{ minHeight: 'calc(100vh - 60px)' }}
				className={`h-app overflow-y-auto overflow-x-hidden max-w-screen -z-10 mt-[60px] scroll-mt-[60px] ${
					isMobile ? 'p-[8px]' : 'p-[16px]'
				} ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
			>
				<div
					className={`rounded-md ${isDarkMode ? 'bg-black' : 'bg-white'} ${
						isMobile ? 'p-[8px]' : 'p-[16px]'
					}`}
				>
					{children}
				</div>
			</div>
		</ConfigProvider>
	)
}

export default AppLayout
