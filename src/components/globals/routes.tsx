import React from 'react'
import {
	ApartmentOutlined,
	AppstoreOutlined,
	DatabaseOutlined,
	DeleteOutlined,
	DeploymentUnitOutlined,
	DollarCircleOutlined,
	FundOutlined,
	HeartOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	PlusCircleOutlined,
	SettingOutlined,
	SolutionOutlined,
	TeamOutlined,
	UserAddOutlined,
	UserSwitchOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons'

import { IAuth } from 'context/auth'

const Home = React.lazy(() => import('pages/home'))
const About = React.lazy(() => import('pages/about'))
const ErrorPage = React.lazy(() => import('pages/404'))
const Settings = React.lazy(() => import('pages/settings'))
const Payments = React.lazy(() => import('pages/payments'))
const LabManagement = React.lazy(() => import('pages/lab'))
const Dashboard = React.lazy(() => import('pages/dashboard'))
const PatientManagement = React.lazy(() => import('pages/patient'))
const InPatientDepartment = React.lazy(() => import('pages/inPatient'))
const OutPatientDepartment = React.lazy(() => import('pages/outPatient'))
const HospitalPackage = React.lazy(() => import('pages/hospitalPackage'))
const Consumables = React.lazy(() => import('pages/inventory/consumables'))
const UserManagement = React.lazy(() => import('pages/userManagement/user'))
const RoleManagement = React.lazy(() => import('pages/userManagement/role'))
const NonConsumables = React.lazy(() => import('pages/inventory/nonConsumables'))
const HealthInsuranceManagement = React.lazy(() => import('pages/healthInsurance'))
const RemovedConsumables = React.lazy(() => import('pages/inventory/removedConsumables'))
const RemovedNonConsumables = React.lazy(() => import('pages/inventory/removedNonConsumables'))

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
		icon: <UserSwitchOutlined />,
		label: 'Out Patient Department',
		link: '/opd',
		Component: OutPatientDepartment,
		permissions: [],
	},
	{
		icon: <UsergroupAddOutlined />,
		label: 'In Patient Department',
		link: '/ipd',
		Component: InPatientDepartment,
		permissions: [],
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
				icon: <ApartmentOutlined />,
			},
			{
				link: '/inventory/non-consumables',
				label: 'Non Consumables',
				Component: NonConsumables,
				icon: <AppstoreOutlined />,
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
	{
		icon: <DeploymentUnitOutlined />,
		label: 'Lab Management',
		link: '/lab',
		Component: LabManagement,
		permissions: [],
	},
	{
		icon: <FundOutlined />,
		label: 'Dashboards',
		link: '/dashboards',
		Component: Dashboard,
		permissions: [],
	},
	{
		icon: <HeartOutlined />,
		label: 'Patient Management',
		link: '/patient',
		Component: PatientManagement,
		permissions: [],
	},
	{
		icon: <DollarCircleOutlined />,
		label: 'Payments',
		link: '/payments',
		Component: Payments,
		permissions: [],
	},
	{
		icon: <SolutionOutlined />,
		label: 'Packages',
		link: '/packages',
		Component: HospitalPackage,
		permissions: [],
	},
	{
		icon: <PlusCircleOutlined />,
		label: 'Health Insurance',
		link: '/health-insurance',
		Component: HealthInsuranceManagement,
		permissions: [],
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
				link: '/users-management/roles',
				label: 'Roles',
				Component: RoleManagement,
				icon: <UserAddOutlined />,
			},
		],
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
]

export default routes
