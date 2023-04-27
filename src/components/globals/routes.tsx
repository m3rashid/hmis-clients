import React from 'react'
import {
	DatabaseOutlined,
	DeleteOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	SettingOutlined,
	TeamOutlined,
	UserAddOutlined,
} from '@ant-design/icons'

import { IAuth } from 'context/auth'
import Home from 'pages/home'
import About from 'pages/about'
import ErrorPage from 'pages/404'
import Settings from 'pages/settings'
import UserManagement from 'pages/userManagement/user'
import RoleManagement from 'pages/userManagement/role'
import PermissionManagement from 'pages/userManagement/permission'
import ResourceManagement from 'pages/userManagement/resource'
import Consumables from 'pages/inventory/consumables'
import NonConsumables from 'pages/inventory/nonConsumables'
import RemovedConsumables from 'pages/inventory/removedConsumables'
import RemovedNonConsumables from 'pages/inventory/removedNonConsumables'

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
		showInNav?: boolean
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
		icon: <SettingOutlined />,
		label: 'Settings',
		link: '/settings',
		permissions: [],
		Component: Settings,
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
		label: '',
		link: '*',
		Component: ErrorPage,
		permissions: [],
		showInNav: false,
	},
	{
		icon: <DatabaseOutlined />,
		label: 'Inventory',
		link: '/inventory',
		Component: Consumables,
		permissions: [],
		nestedLinks: [
			{
				link: '/inventory/consumables',
				label: 'Consumables',
				Component: Consumables,
				icon: <DatabaseOutlined />,
			},
			{
				link: '/inventory/non-consumables',
				label: 'Non Consumables',
				Component: NonConsumables,
				icon: <DatabaseOutlined />,
			},
			{
				link: '/inventory/consumables-removed',
				label: 'Removed Consumables',
				Component: RemovedConsumables,
				icon: <DeleteOutlined />,
				showInNav: false,
			},
			{
				link: '/inventory/non-consumables-removed',
				label: 'Removed Non Consumables',
				Component: RemovedNonConsumables,
				icon: <DeleteOutlined />,
				showInNav: false,
			},
		],
	},
	// consumables-deleted
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
]

export default routes
