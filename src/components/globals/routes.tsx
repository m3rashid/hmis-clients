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
	MedicineBoxOutlined,
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
const LabManagement = React.lazy(() => import('../../pages/lab'));
const Profile = React.lazy(() => import('../../pages/me/profile'));
const Dashboard = React.lazy(() => import('../../pages/dashboard'));
const MySettings = React.lazy(() => import('../../pages/me/settings'));
const Payments = React.lazy(() => import('../../pages/services/payments'));
const Announcements = React.lazy(() => import('../../pages/announcements'));
const HospitalPackage = React.lazy(() => import('../../pages/hospitalPackage'));
const Consumables = React.lazy(() => import('../../pages/inventory/consumables'));
const UserManagement = React.lazy(() => import('../../pages/userManagement/user'));
const RoleManagement = React.lazy(() => import('../../pages/userManagement/role'));
const CreateWidget = React.lazy(() => import('../../pages/dashboard/createWidget'));
const NonConsumables = React.lazy(() => import('../../pages/inventory/nonConsumables'));
const RemovedConsumables = React.lazy(() => import('../../pages/archives/consumables'));
const AttendanceManagement = React.lazy(() => import('../../pages/services/attendance'));
const Appointments = React.lazy(() => import('../../pages/patientManagement/appointment'));
const PatientManagement = React.lazy(() => import('../../pages/patientManagement/patient'));
const RemovedNonConsumables = React.lazy(() => import('../../pages/archives/nonConsumables'));
const InPatientDepartment = React.lazy(() => import('../../pages/patientManagement/inPatient'));
const OutPatientDepartment = React.lazy(() => import('../../pages/patientManagement/outPatient'));
const HealthInsuranceManagement = React.lazy(() => import('../../pages/services/healthInsurance'));

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
		icon: <HomeOutlined />,
		label: 'Me Home',
		link: '/me',
		nestedLinks: [
			{
				icon: <UserOutlined />,
				label: 'Profile',
				link: '/me/profile',
				Component: Profile,
			},
			{
				icon: <SettingOutlined />,
				label: 'Settings',
				link: '/me/settings',
				Component: MySettings,
			},
		],
	},
	{
		icon: <FundOutlined />,
		label: 'Dashboard Widgets',
		link: '/widgets',
		Component: Dashboard,
		permission: { resource: 'USER', action: 'READ' },
		nestedLinks: [
			{
				icon: <FundOutlined />,
				label: 'Widgets',
				link: '/widgets/all',
				Component: Dashboard,
			},
			{
				icon: <FundOutlined />,
				label: 'Add Widgets',
				link: '/widgets/add',
				Component: CreateWidget,
				showInNav: false,
			},
		],
	},
	{
		icon: <TeamOutlined />,
		label: 'User Management',
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
				label: 'Appointments',
				link: '/patient/appointments',
				Component: Appointments,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UserSwitchOutlined />,
				label: 'Out Patient Department',
				link: '/patient/out-patient',
				Component: OutPatientDepartment,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UsergroupAddOutlined />,
				label: 'In Patient Department',
				link: '/patient/in-patient',
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
		link: '/service',
		nestedLinks: [
			{
				icon: <DollarCircleOutlined />,
				label: 'Payments',
				link: '/service/payments',
				Component: Payments,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <PlusCircleOutlined />,
				label: 'Health Insurance',
				link: '/service/health-insurance',
				Component: HealthInsuranceManagement,
				permission: { resource: 'USER', action: 'READ' },
			},
			{
				icon: <UserOutlined />,
				label: 'Attendance',
				link: '/service/attendance',
				Component: AttendanceManagement,
				permission: { resource: 'ATTENDANCE', action: 'READ' },
			},
		],
	},
	{
		icon: <NotificationOutlined />,
		label: 'Announcements',
		link: '/announcements',
		Component: Announcements,
		permission: { resource: 'USER', action: 'READ' },
	},
	{
		icon: <SolutionOutlined />,
		label: 'Packages',
		link: '/packages',
		Component: HospitalPackage,
		permission: { resource: 'USER', action: 'READ' },
	},
	{
		icon: <MedicineBoxOutlined />,
		label: 'Archives',
		link: '/archives',
		nestedLinks: [
			{
				icon: <DeleteOutlined />,
				label: 'Consumables',
				link: '/archives/consumables',
				Component: RemovedConsumables,
				permission: { resource: 'CONSUMABLES', action: 'READ' },
				showInNav: true,
			},
			{
				icon: <DeleteOutlined />,
				label: 'Non Consumables',
				link: '/archives/non-consumables',
				Component: RemovedNonConsumables,
				permission: { resource: 'NON_CONSUMABLES', action: 'READ' },
				showInNav: true,
			},
		],
	},
	{
		icon: <SettingOutlined />,
		label: 'App Settings',
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
