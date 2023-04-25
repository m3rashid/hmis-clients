import React from 'react'
import {
	BookOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	ReadOutlined,
	TagsOutlined,
	TeamOutlined,
	UserAddOutlined,
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
import UserManagement from 'pages/userManagement/user'
import RoleManagement from 'pages/userManagement/role'
import PermissionManagement from 'pages/userManagement/permission'
import ResourceManagement from 'pages/userManagement/resource'

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
		label: 'Home',
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
		label: 'About',
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
		icon: <TeamOutlined />,
		label: 'User Management',
		link: '/users-management',
		Component: UserManagement,
		permissions: [],
		nestedLinks: [
			{
				link: '/users-management/users',
				label: 'Users',
				Component: UserManagement,
				icon: <UserAddOutlined />,
			},
			{
				link: '/users-management/resources',
				label: 'Resources',
				Component: ResourceManagement,
				icon: <UserAddOutlined />,
			},
			{
				link: '/users-management/roles',
				label: 'Roles',
				Component: RoleManagement,
				icon: <UserAddOutlined />,
			},
			{
				link: '/users-management/permissions',
				label: 'Permissions',
				Component: PermissionManagement,
				icon: <UserAddOutlined />,
			},
		],
	},
	{
		icon: <ReadOutlined />,
		label: 'Learn',
		link: '/learn',
		Component: Learn,
		permissions: [],
		nestedLinks: [
			{
				link: '/learn/home',
				label: 'Home',
				Component: Learn,
				icon: <ReadOutlined />,
			},
			{
				link: '/learn/modules',
				label: 'Modules',
				Component: Modules,
				icon: <BookOutlined />,
			},
		],
	},
]

export default routes
