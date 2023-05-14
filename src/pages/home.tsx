import React from 'react'
import Lottie from 'react-lottie'
import * as allServices from 'animations/hmis-services.json'
import { Collapse, List, Steps, Typography } from 'antd'

const featuresData = [
	{
		key: '1',
		header: 'OPD (Out Patient Department)',
		features: [
			['Come', 'Consult', 'Go'],
			'Appointments/ Single-Time interactions',
			'Discrete History Management',
		],
	},
	{
		key: '2',
		header: 'IPD (In Patient Department)',
		features: [
			['Admit', 'Treat', 'Discharge', 'Follow-up'],
			'Continuous Patient Journey',
			'Department Specific',
			'Operations and surgeries management',
		],
	},
	{
		key: '3',
		header: 'Inventory Management',
		features: [
			'Centralized Inventory Management',
			'Consumables (Medicines, Syringes, etc.)',
			'Non-Consumables (Equipment, Beds, etc.)',
		],
	},
	{
		key: '4',
		header: 'Lab Management',
		features: [
			'Centralized Lab Management',
			'Scannable Test Reports to generate E-Docs',
			'Easy integration with testing machines',
			'Test Reports and Analysis',
		],
	},
	{
		key: '5',
		header: 'Dashboards (Insights and Analytics)',
		features: [
			'How is your hospital performing?',
			'How are your assets and resources being utilized?',
		],
	},
	{
		key: '6',
		header: 'Patient Management',
		features: [
			'Patient Navigation',
			'Patient Behavior',
			'Patient Journey',
			'Patient Satisfaction',
			'Tracking and Behavior',
		],
	},
	{
		key: '7',
		header: 'Payments',
		features: ['Payment Integration', 'Skip/Configurable Payments'],
	},
	{
		key: '8',
		header: 'Hospital Package Creator',
		features: ['Health Checkups', 'Operations and surgeries', 'Cost Analysis'],
	},
	{
		key: '9',
		header: 'Health Insurance',
		features: [
			'Integration with Health Insurance Companies',
			'Integration with Govt. for Health IDs',
		],
	},
	{
		key: '10',
		header: 'Other Features',
		features: ['Patient options for nearest hospital selection (tenant based)'],
	},
]

const Home = () => {
	return (
		<>
			<div className='flex flex-col-reverse sm:flex-row gap-10 items-center justify-between'>
				<div className='flex-grow'>
					<Typography.Title level={2}>Welcome to HMIS</Typography.Title>
					<Typography.Text>HMIS powers the Hospitals for all administrative needs</Typography.Text>

					<br />
					<br />
					<br />

					<Typography.Title level={3}>Features</Typography.Title>

					<Collapse
						accordion
						expandIconPosition='right'
						ghost
						defaultActiveKey={[featuresData[0].key]}
						className='bg-white border-0 p-0 m-0'
						bordered={false}
					>
						{featuresData.map(feature => (
							<Collapse.Panel
								className='m-0 p-0'
								key={feature.key}
								header={
									<Typography.Text className='font-semibold'>{feature.header}</Typography.Text>
								}
							>
								<List
									bordered={false}
									className='ml-2'
									dataSource={feature.features}
									renderItem={(item, index) => {
										if (typeof item === 'string')
											return (
												<List.Item className='border-0' key={feature.key + index + item}>
													{item}
												</List.Item>
											)
										return (
											<List.Item key={feature.key + index}>
												<Steps
													size='small'
													className='border-0'
													current={item.length}
													items={item.map(t => ({ title: t, key: t + index }))}
												/>
											</List.Item>
										)
									}}
								/>
							</Collapse.Panel>
						))}
					</Collapse>
				</div>

				<div>
					<Lottie options={{ animationData: allServices }} height={800} />
				</div>
			</div>
		</>
	)
}

export default Home
