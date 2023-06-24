import { MODELS } from '@hmis/gatekeeper';
import ServiceManagementContainer from '.';
import useTableForm from '../../components/form/useTableForm';
import TableHoc from '../../components/table';
import { TableProps } from 'antd';
import apiService from '../../api/service';

const HealthInsuranceManagement = () => {
	const { selectedRowsAtom } = useTableForm<MODELS.IAttendance>({
		atomKey: 'serviceAttendance',
		okActionButtonLabel: '',
	});

	const columns: TableProps<any>['columns'] = [];

	return (
		<ServiceManagementContainer>
			<TableHoc<MODELS.IAttendance>
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
					list: apiService('/healthInsurance/all', 'GET'),
				}}
			/>
		</ServiceManagementContainer>
	);
};

export default HealthInsuranceManagement;
