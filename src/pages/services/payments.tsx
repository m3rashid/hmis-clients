import { MODELS } from '@hmis/gatekeeper';
import ServiceManagementContainer from '.';
import TableHoc from '../../components/table';
import useTableForm from '../../components/form/useTableForm';
import { TableProps } from 'antd';
import apiService from '../../api/service';

const Payments = () => {
	const { selectedRowsAtom } = useTableForm<MODELS.IPayment>({
		atomKey: 'servicePayment',
		okActionButtonLabel: '',
	});

	const columns: TableProps<any>['columns'] = [];

	return (
		<ServiceManagementContainer>
			<TableHoc<MODELS.IPayment>
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
					list: apiService('/payment/all', 'GET'),
				}}
			/>
		</ServiceManagementContainer>
	);
};

export default Payments;