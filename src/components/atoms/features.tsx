import {
	CustomerServiceOutlined,
	DatabaseOutlined,
	DeploymentUnitOutlined,
	DollarCircleOutlined,
	FundOutlined,
	HeartOutlined,
	PlusCircleOutlined,
	SolutionOutlined,
	UserSwitchOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';

export const featuresData = [
	{
		key: '1',
		title: 'OPD (Out Patient Department)',
		icon: UserSwitchOutlined,
		description: 'Appointments/ Single-Time interactions with Discrete History Management',
	},
	{
		key: '3',
		title: 'Inventory Management',
		icon: DatabaseOutlined,
		description:
			'Centralized Inventory Management with consumables and non-consumables segregation',
	},
	{
		key: '2',
		title: 'IPD (In Patient Department)',
		icon: UsergroupAddOutlined,
		description:
			'Department agnostic/Specific Continuous Patient Journey with all Operations and surgeries management already built in',
	},
	{
		key: '4',
		title: 'Lab Management',
		icon: DeploymentUnitOutlined,
		description:
			'Centralized Lab Management with Scannable Test Reports to generate E-Docs, Test Reports, Analysis and integration with testing machines',
	},
	{
		key: '5',
		title: 'Dashboards (Insights and Analytics)',
		icon: FundOutlined,
		description: 'Insights about hospital performance, assets utilization, patient behavior etc.',
	},
	{
		key: '6',
		title: 'Patient Management',
		icon: HeartOutlined,
		description:
			'Patient management with features like behavior tracking, navigation history, etc. to make the patient journey seamless',
	},
	{
		key: '7',
		title: 'Payments',
		icon: DollarCircleOutlined,
		description: 'Payment Integration with Skip/Configurable Payments',
	},
	{
		key: '8',
		title: 'Hospital Package Creator',
		icon: SolutionOutlined,
		description: 'Create your own packages of Health Checkups, surgeries for better Cost Analysis',
	},
	{
		key: '9',
		title: 'Health Insurance',
		icon: PlusCircleOutlined,
		description: 'Integration with Health Insurance Companies and Govt. for Health IDs',
	},
	{
		key: '10',
		title: 'Other Features',
		icon: CustomerServiceOutlined,
		description: 'Patient options for nearest hospital selection (tenant based)',
	},
];
