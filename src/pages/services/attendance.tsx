import { TableProps } from 'antd';
import { MODELS } from '@hmis/gatekeeper';
import ServiceManagementContainer from '.';
import apiService from '../../api/service';
import TableHoc from '../../components/table';
import useTableForm from '../../components/form/useTableForm';

const AttendanceManagement = () => {
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
					list: apiService('/user/attendance/all'),
				}}
				listBody={{
					query: { deleted: false },
					options: {
						$sort: { createdAt: -1 },
						lean: true,
					},
				}}
			/>
		</ServiceManagementContainer>
	);
};

export default AttendanceManagement;
