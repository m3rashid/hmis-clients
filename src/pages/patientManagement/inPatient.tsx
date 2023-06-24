import { atom, useRecoilState } from 'recoil';
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from '../../components/table';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import { TableProps } from 'antd';
import dayjs from 'dayjs';
import PatientManagementContainer from '.';

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IIpd>>({
	key: 'patientIpd',
	default: defaultTableAtomContents<MODELS.IIpd>(),
});

const InPatientDepartment = () => {
	const [
		// { selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);

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
					// footer: ActionButtons,
				}}
				editable
				// form={FormContainer}
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/ipd/all', 'GET'),
				}}
			/>
		</PatientManagementContainer>
	);
};

export default InPatientDepartment;
