import { MODELS } from '@hmis/gatekeeper';
import PatientManagementContainer from '.';
import useTableForm from '../../components/form/useTableForm';
import TableHoc from '../../components/table';
import { TableProps } from 'antd';
import apiService from '../../api/service';

const PatientManagement = () => {
	const { selectedRowsAtom } = useTableForm<MODELS.IProfile>({
		atomKey: 'patientManagementPatient',
		okActionButtonLabel: '',
	});

	const columns: TableProps<any>['columns'] = [];

	return (
		<PatientManagementContainer>
			<TableHoc<MODELS.IProfile>
				title="Attendance"
				selectedRowsAtom={selectedRowsAtom}
				drawerProps={{
					width: '50vw',
				}}
				editable
				popupType="drawer"
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				routes={{
					list: apiService('/patient/all', 'GET'),
				}}
			/>
		</PatientManagementContainer>
	);
};

export default PatientManagement;
