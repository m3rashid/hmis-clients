import TableHoc from '../../components/table';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import { TableProps } from 'antd';
import dayjs from 'dayjs';
import PatientManagementContainer from '.';
import useTableForm from '../../components/form/useTableForm';
import IpdForm from '../../components/ipdForm';

const InPatientDepartment = () => {
	const { selectedRowsAtom, ActionButtons, editData, form, isEdit } = useTableForm<MODELS.IIpd>({
		atomKey: 'patientIpd',
		okActionButtonLabel: 'Add IPD',
	});

	const columns: TableProps<any>['columns'] = [
		{ title: 'Patient', dataIndex: 'patient', key: 'patient', render: (patient) => patient.name },
		{ title: 'status', dataIndex: 'status', key: 'status' },
		{
			title: 'From',
			dataIndex: 'fromDate',
			key: 'fromDate',
			render: (date) => dayjs(date).format('DD-MM-YYYY HH:mm A'),
		},
		{
			title: 'To',
			dataIndex: 'toDate',
			key: 'toDate',
			render: (date) => dayjs(date).format('DD-MM-YYYY HH:mm A'),
		},
	];

	return (
		<PatientManagementContainer>
			<TableHoc<MODELS.IIpd>
				title="IPD"
				addButtonLabel="Add IPD"
				selectedRowsAtom={selectedRowsAtom}
				drawerProps={{
					width: '50vw',
					footer: ActionButtons,
				}}
				editable
				form={<IpdForm editData={editData} form={form} isEdit={isEdit} />}
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/ipd/all'),
				}}
				listBody={{
					query: { deleted: false },
					options: {
						$sort: { createdAt: -1 },
						lean: true,
					},
				}}
			/>
		</PatientManagementContainer>
	);
};

export default InPatientDepartment;
