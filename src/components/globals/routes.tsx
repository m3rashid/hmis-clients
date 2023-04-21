import React from 'react'
import {
	BookOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	ReadOutlined,
	TagsOutlined,
} from '@ant-design/icons'

import { IAuth } from 'recoilAtoms/auth'
import Home from 'pages/home'
import About from 'pages/about'
import Learn from 'pages/learn'
import ErrorPage from 'pages/404'
import Modules from 'pages/learn/modules'
import Metrics from 'pages/dev/metrics'
import TicketingSystem from 'components/ticketingSystem'
import AdminConfig from 'pages/config'

export type IRoute = {
	label: string
	link: string
	Component: React.FC
	permissions: Array<string>
	icon: React.ReactNode
	props?: any
	showInNav?: boolean
	role?: Array<string>
	nestedLinks?: Array<{
		label: string
		link: string
		Component: React.FC
		icon: React.ReactNode
	}>
}

export const checkAccess = (auth: IAuth, route: IRoute) => {
	if (!auth.isLoggedIn) return false
	if (!route.role || route.role.includes('*')) return true
	if (auth.user?.userRole === 'ADMIN') return true
	const contains = route.role.some(role => auth.user?.permissions.includes(role))
	return contains
}

const routes: Array<IRoute> = [
	{
		icon: <HomeOutlined />,
		label: 'home',
		link: '/',
		Component: Home,
		permissions: [],
	},
	{
		icon: <TagsOutlined />,
		label: 'Ticketing System',
		link: '/ticket',
		permissions: [],
		Component: TicketingSystem,
	},
	{
		icon: <TagsOutlined />,
		label: 'Config',
		link: '/admin-config',
		permissions: [],
		Component: AdminConfig,
	},
	{
		icon: <InfoCircleOutlined />,
		label: 'about',
		link: '/about',
		Component: About,
		permissions: [],
	},
	{
		icon: <InfoCircleOutlined />,
		label: 'Server Metrics',
		link: '/metrics',
		Component: Metrics,
		permissions: [],
	},
	{
		icon: <InfoCircleOutlined />,
		label: '',
		link: '*',
		Component: ErrorPage,
		permissions: [],
		showInNav: false,
	},
	{
		icon: <ReadOutlined />,
		label: 'learn',
		link: '/learn',
		Component: Learn,
		permissions: [],
		nestedLinks: [
			{
				link: '/home',
				label: 'learn-home',
				Component: Learn,
				icon: <ReadOutlined />,
			},
			{
				link: '/modules',
				label: 'learn-modules',
				Component: Modules,
				icon: <BookOutlined />,
			},
		],
	},
]

export default routes
