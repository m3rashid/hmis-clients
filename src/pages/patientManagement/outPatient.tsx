import TableHoc from '../../components/table';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import { TableProps } from 'antd';
import dayjs from 'dayjs';
import PatientManagementContainer from '.';
import useTableForm from '../../components/form/useTableForm';
import OpdForm from '../../components/opdForm';

const OutPatientDepartment = () => {
	const { selectedRowsAtom, ActionButtons, form, editData, isEdit } = useTableForm<MODELS.IOpd>({
		atomKey: 'patientOpd',
		okActionButtonLabel: 'Add OPD',
	});

	const columns: TableProps<any>['columns'] = [
		{
			title: 'Appointment',
			dataIndex: 'appointment',
			key: 'appointment',
			render: (appointment) => appointment.date,
		},
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{ title: 'Payment', dataIndex: 'payment', key: 'payment', render: (payment) => payment.status },
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (date) => dayjs(date).format('DD-MM-YYYY HH:mm A'),
		},
		{
			title: 'Next Date',
			dataIndex: 'nextDate',
			key: 'nextDate',
			render: (date) => dayjs(date).format('DD-MM-YYYY HH:mm A'),
		},
	];

	return (
		<PatientManagementContainer>
			<TableHoc<MODELS.IOpd>
				title="OPD"
				addButtonLabel="Add OPD"
				selectedRowsAtom={selectedRowsAtom}
				drawerProps={{
					footer: ActionButtons,
				}}
				form={<OpdForm editData={editData} form={form} isEdit={isEdit} />}
				editable
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/opd/all', 'GET'),
				}}
			/>
		</PatientManagementContainer>
	);
};

export default OutPatientDepartment;
