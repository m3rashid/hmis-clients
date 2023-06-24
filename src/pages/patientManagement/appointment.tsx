import React from 'react';
import { atom, useRecoilState } from 'recoil';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/table';
import { MODELS } from '@hmis/gatekeeper';
import { TableProps } from 'antd';
import apiService from '../../api/service';
import dayjs from 'dayjs';
import PatientManagementContainer from '.';
import AppointmentForm from '../../components/appointmentForm';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IAppointment>>({
	key: 'patientAppointment',
	default: defaultTableAtomContents<MODELS.IAppointment>(),
});

const Appointments: React.FC = () => {
	const [{ selectedRows }, setSelectedRows] = useRecoilState(selectedRowsAtom);

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

	const { ActionButtons, FormContainer } = AppointmentForm({
		closeModal: () => setSelectedRows((p) => ({ ...p, formModalOpen: false })),
		editData: selectedRows[0],
	});

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
				form={FormContainer}
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/appointment/all', 'GET'),
				}}
			/>
		</PatientManagementContainer>
	);
};

export default Appointments;
