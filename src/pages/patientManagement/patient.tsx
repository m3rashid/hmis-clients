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

	const columns: TableProps<any>['columns'] = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{
			title: 'Email Verified',
			dataIndex: 'emailVerified',
			key: 'emailVerified',
			render: (entry) => (entry ? 'Yes' : 'No'),
		},
	];

	return (
		<PatientManagementContainer>
			<TableHoc<MODELS.IProfile>
				title="Patients"
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
					list: apiService('/patient/all'),
				}}
				listBody={{
					query: {
						deleted: false,
						origin: 'EXTERNAL',
					},
					options: {
						$sort: { createdAt: -1 },
						lean: true,
					},
				}}
			/>
		</PatientManagementContainer>
	);
};

export default PatientManagement;
