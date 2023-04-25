import { RJSFSchema } from '@rjsf/utils'
import { Button, TableProps } from 'antd'
import TableHoc from 'hocs/table'
import React from 'react'
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import configAtom from 'recoilAtoms/config'

interface IProps {}

const TicketingSystem: React.FC<IProps> = () => {
	const { colors } = useRecoilValue(configAtom)

	const columns: TableProps<any>['columns'] = [
		{ title: 'Sl. No', dataIndex: 'id', key: 'id', render: (_, __, idx) => idx + 1 },
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Patient', dataIndex: 'patient', key: 'patient' },
		{ title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
		{ title: 'Time', dataIndex: 'time', key: 'time' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{
			title: 'Action',
			render: (_, row) => {
				return (
					<div className='flex items-center justify-center gap-2'>
						<Button
							type='primary'
							style={{ background: colors.info }}
							icon={<InfoCircleOutlined />}
						/>
						<Button type='primary' style={{ background: colors.warning }} icon={<EditOutlined />} />
						<Button
							type='primary'
							style={{ background: colors.danger }}
							icon={<DeleteOutlined />}
						/>
					</div>
				)
			},
		},
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: ['name', 'patient', 'doctor', 'time'],
		properties: {
			name: { type: 'string', title: 'Name' },
			patient: { type: 'string', title: 'Patient' },
			doctor: { type: 'string', title: 'Doctor' },
			time: { type: 'string', title: 'Time', format: 'date-time' },
		},
	}

	return (
		<div>
			<TableHoc
				title='Appointments'
				tableProps={{
					columns: columns,
					dataSource: [
						{
							id: 1,
							name: 'Appointment 1',
							patient: 'Patient 1',
							doctor: 'Doctor 1',
							time: '2021-01-01 12:00:00',
							status: 'Pending',
						},
					],
					style: {
						minHeight: '500px',
					},
				}}
				routes={{
					get: '/ticket',
				}}
				showTitle={false}
				formSchema={formSchema}
				ActionButtons={<></>}
			/>
		</div>
	)
}

export default TicketingSystem
