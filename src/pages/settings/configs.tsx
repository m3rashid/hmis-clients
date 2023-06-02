import ConfigContainer from 'src/pages/settings/configContainer'

export const Colors = () => (
	<div className='flex flex-col sm:flex-row items-stretch justify-stretch'>
		<ConfigContainer
			className='w-full'
			configKey='colors'
			title='General Colors Config'
			widgetType='color'
		/>
		<ConfigContainer
			className='w-full'
			configKey='appColors'
			title='App Colors Config'
			widgetType='color'
		/>
	</div>
)

export const App = () => <ConfigContainer configKey='app' title='App Config' />
