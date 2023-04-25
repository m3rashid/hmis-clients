import React from 'react'
import ConfigContainer from './configContainer'

export const AppColor = () => (
	<ConfigContainer configKey='appColors' title='App Colors Config' widgetType='color' />
)

export const ThemeColor = () => (
	<ConfigContainer configKey='colors' title='General Colors Config' widgetType='color' />
)

export const App = () => <ConfigContainer configKey='app' title='App Config' />
