import React from 'react';
import TableHoc from '../../components/table';
import { MODELS, appointmentValidator } from '@hmis/gatekeeper';
import { TableProps } from 'antd';
import apiService from '../../api/service';
import dayjs from 'dayjs';
import PatientManagementContainer from '.';
import AppointmentForm from '../../components/appointmentForm';
import useTableForm from '../../components/form/useTableForm';
import { IAppointment } from '@hmis/gatekeeper/dist/models/index';

const Appointments: React.FC = () => {
	const { selectedRowsAtom, ActionButtons, editData, isEdit, form } = useTableForm<IAppointment>({
		add: {
			endpoint: '/appointment/add',
			validatorSchema: appointmentValidator.createAppointmentSchema,
		},
		update: {
			endpoint: '/appointment/edit',
			validatorSchema: appointmentValidator.updateAppointmentSchema,
		},
		atomKey: 'patientAppointment',
		okActionButtonLabel: 'Confirm Appointment',
	});

	const columns: TableProps<any>['columns'] = [
		{ title: 'Doctor', dataIndex: 'doctor', key: 'doctor', render: (doctor) => doctor.name },
		{ title: 'Patient', dataIndex: 'patient', key: 'patient', render: (patient) => patient.name },
		{ title: 'status', dataIndex: 'status', key: 'status' },
		{ title: 'Payment', dataIndex: 'payment', key: 'payment', render: (payment) => payment.status },
		{ title: 'Type', dataIndex: 'type', key: 'type' },
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (date) => dayjs(date).format('DD-MM-YYYY HH:mm A'),
		},
	];

	return (
		<PatientManagementContainer>
			<TableHoc<MODELS.IAppointment>
				title="Appointments"
				addButtonLabel="Add Appointment"
				selectedRowsAtom={selectedRowsAtom}
				drawerProps={{
					footer: ActionButtons,
				}}
				editable
				form={<AppointmentForm editData={editData} form={form} isEdit={isEdit} />}
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/checkup/appointment/all'),
				}}
				listBody={{
					query: { deleted: false },
					options: {
						$sort: { createdAt: -1 },
						lean: true,
						populate: ['doctor', 'patient'],
					},
				}}
			/>
		</PatientManagementContainer>
	);
};

export default Appointments;
