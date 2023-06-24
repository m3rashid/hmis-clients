import { atom, useRecoilState } from "recoil";
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from "../../components/table";
import { MODELS } from "@hmis/gatekeeper";
import { Fragment } from "react";
import apiService from "../../api/service";
import { TableProps } from "antd";
import dayjs from "dayjs";
import PatientManagementContainer from ".";

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IOpd>>({
	key: 'patientOpd',
	default: defaultTableAtomContents<MODELS.IOpd>(),
});

const OutPatientDepartment = () => {
	const [
		// { selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);

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
					// width: '50vw',
				}}
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
