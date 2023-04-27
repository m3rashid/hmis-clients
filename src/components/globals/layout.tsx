import enUs from 'antd/locale/en_US'
import { uiContext } from 'context/ui'
import Brand from 'components/globals/brand'
import { ConfigProvider, theme } from 'antd'
import { configContext } from 'context/config'
import AuthActions from 'components/globals/authActions'
import GlobalSearch from 'components/globals/globalSearch'
import NavigationMenu from 'components/globals/navigationMenu'
import React, { PropsWithChildren, useContext, useLayoutEffect } from 'react'

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const [config] = useContext(configContext)
	const [{ isMobile }, setIsMobile] = useContext(uiContext)

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
				className={`h-[60px] gap-x-10 all-center fixed w-screen top-0 z-50 py-[10px] px-[10px] sm:px-[20px] ${
					isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
				}`}
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
				className={`h-app overflow-y-auto overflow-x-hidden max-w-screen -z-10 mt-[60px] scroll-mt-[60px] p-[8px] sm:p-[16px] ${
					isDarkMode ? 'bg-neutral-900' : 'bg-neutral-100'
				}`}
			>
				<div className={`rounded-md p-[8px] sm:p-[16px] ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
					{children}
				</div>
			</div>
		</ConfigProvider>
	)
}

export default AppLayout
