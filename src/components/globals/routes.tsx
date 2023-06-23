import {
	ApartmentOutlined,
	AppstoreOutlined,
	CustomerServiceOutlined,
	DatabaseOutlined,
	DeleteOutlined,
	DeploymentUnitOutlined,
	DollarCircleOutlined,
	FundOutlined,
	HeartOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	NotificationOutlined,
	PlusCircleOutlined,
	SettingOutlined,
	SolutionOutlined,
	TeamOutlined,
	UserAddOutlined,
	UserOutlined,
	UserSwitchOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';
import React from 'react';
import { IAuth } from '../../recoil/auth';

const Home = React.lazy(() => import('../../pages/home'));
const About = React.lazy(() => import('../../pages/about'));
const Settings = React.lazy(() => import('../../pages/settings'));
const Payments = React.lazy(() => import('../../pages/payments'));
const LabManagement = React.lazy(() => import('../../pages/lab'));
const Dashboard = React.lazy(() => import('../../pages/dashboard'));
const Appointments = React.lazy(() => import('../../pages/appointment'));
const PatientManagement = React.lazy(() => import('../../pages/patient'));
const Notifications = React.lazy(() => import('../../pages/notifications'));
const InPatientDepartment = React.lazy(() => import('../../pages/inPatient'));
const AttendanceManagement = React.lazy(() => import('../../pages/attendance'));
const OutPatientDepartment = React.lazy(() => import('../../pages/outPatient'));
const HospitalPackage = React.lazy(() => import('../../pages/hospitalPackage'));
const Consumables = React.lazy(() => import('../../pages/inventory/consumables'));
const UserManagement = React.lazy(() => import('../../pages/userManagement/user'));
const RoleManagement = React.lazy(() => import('../../pages/userManagement/role'));
const NonConsumables = React.lazy(() => import('../../pages/inventory/nonConsumables'));
const HealthInsuranceManagement = React.lazy(() => import('../../pages/healthInsurance'));
const RemovedConsumables = React.lazy(() => import('../../pages/inventory/removedConsumables'));
const RemovedNonConsumables = React.lazy(
	() => import('../../pages/inventory/removedNonConsumables')
);

export const resourceTypes = [
	'USER',
	'PROFILE',
	'ADDRESS',
	'PERMISSION',
	'ROLE',
	'AVAILABILITY',
	'LEAVE',
	'APPOINTMENT',
	'CONSUMABLES',
	'NON_CONSUMABLES',
	'PRESCRIPTION',
	'CONFIG',
	'ATTENDANCE',
] as const;

interface IPermission {
	resource: (typeof resourceTypes)[number];
	action: string;
}

export type IRoute = {
	icon: React.ReactNode;
	label: string;
	link: string;
	Component?: React.FC;
	showInNav?: boolean;
	permission?: IPermission;
	nestedLinks?: Array<{
		icon: React.ReactNode;
		label: string;
		link: string;
		Component: React.FC;
		showInNav?: boolean;
		permission?: IPermission;
	}>;
};

export const checkAccess = (auth: IAuth, permission?: IPermission) => {
	if (!auth.isLoggedIn) return false;
	if (!permission) return true;
	// TODO: check permissions here
	return true;
};

const routes: Array<IRoute> = [
	{
		icon: <HomeOutlined />,
		label: 'Home',
		link: '/',
		Component: Home,
	},
	{
		icon: <TeamOutlined />,
		label: 'Permission Management',
		link: '/users',
		nestedLinks: [
			{
				icon: <UserAddOutlined />,
				label: 'Users',
				link: '/users/users',
				Component: UserManagement,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UserAddOutlined />,
				label: 'Roles',
				link: '/users/roles',
				permission: { resource: 'ROLE', action: 'READ' },
				Component: RoleManagement,
			},
		],
	},
	{
		icon: <HeartOutlined />,
		label: 'Patient Management',
		link: '/patient',
		nestedLinks: [
			{
				icon: <HeartOutlined />,
				label: 'Patient Home',
				link: '/patient/home',
				Component: PatientManagement,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UsergroupAddOutlined />,
				label: 'Patient Home',
				link: '/patient/appointments',
				Component: Appointments,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UserSwitchOutlined />,
				label: 'Out Patient Department',
				link: '/patient/opd',
				Component: OutPatientDepartment,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UsergroupAddOutlined />,
				label: 'In Patient Department',
				link: '/patient/ipd',
				Component: InPatientDepartment,
				permission: { resource: 'USER', action: 'READ' },
			},
		],
	},
	{
		icon: <DatabaseOutlined />,
		label: 'Inventory',
		link: '/inventory',
		nestedLinks: [
			{
				icon: <ApartmentOutlined />,
				label: 'Consumables',
				link: '/inventory/consumables',
				Component: Consumables,
				permission: { resource: 'CONSUMABLES', action: 'READ' },
			},
			{
				icon: <AppstoreOutlined />,
				label: 'Non Consumables',
				link: '/inventory/non-consumables',
				Component: NonConsumables,
				permission: { resource: 'NON_CONSUMABLES', action: 'READ' },
			},
			{
				icon: <DeleteOutlined />,
				label: 'Removed Consumables',
				link: '/inventory/consumables-removed',
				Component: RemovedConsumables,
				permission: { resource: 'CONSUMABLES', action: 'READ' },
				showInNav: false,
			},
			{
				icon: <DeleteOutlined />,
				label: 'Removed Non Consumables',
				link: '/inventory/non-consumables-removed',
				Component: RemovedNonConsumables,
				permission: { resource: 'NON_CONSUMABLES', action: 'READ' },
				showInNav: false,
			},
		],
	},
	{
		icon: <DeploymentUnitOutlined />,
		label: 'Lab Management',
		link: '/lab',
		Component: LabManagement,
		permission: { resource: 'USER', action: 'READ' },
	},
	{
		icon: <CustomerServiceOutlined />,
		label: 'Services',
		link: '/services',
		nestedLinks: [
			{
				icon: <DollarCircleOutlined />,
				label: 'Payments',
				link: '/services/payments',
				Component: Payments,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <PlusCircleOutlined />,
				label: 'Health Insurance',
				link: '/services/health',
				Component: HealthInsuranceManagement,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <FundOutlined />,
				label: 'Dashboards',
				link: '/services/dashboards',
				Component: Dashboard,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UserOutlined />,
				label: 'Attendance',
				link: '/services/attendance',
				Component: AttendanceManagement,
				permission: { resource: 'ATTENDANCE', action: 'READ' },
			},
			{
				icon: <NotificationOutlined />,
				label: 'Notice and Circulars',
				link: '/services/notices',
				Component: Notifications,
				permission: { resource: 'USER', action: 'READ' },
			},
		],
	},
	{
		icon: <SolutionOutlined />,
		label: 'Packages',
		link: '/packages',
		Component: HospitalPackage,
		permission: { resource: 'USER', action: 'READ' },
	},
	{
		icon: <SettingOutlined />,
		label: 'Settings',
		link: '/settings',
		permission: { resource: 'USER', action: 'READ' },
		Component: Settings,
	},
	{
		icon: <InfoCircleOutlined />,
		label: 'About',
		link: '/about',
		Component: About,
	},
];

export default routes;
