import { atom, useRecoilState } from "recoil";
import TableHoc, { SelectedRowsAtom, defaultTableAtomContents } from "../../components/hocs/table";
import { MODELS } from "@hmis/gatekeeper";
import { Fragment } from "react";
import apiService from "../../api/service";
import { TableProps } from "antd";

const selectedRowsAtom = atom<SelectedRowsAtom<MODELS.IAppointment>>({
	key: 'userManagementRole',
	default: defaultTableAtomContents<MODELS.IAppointment>(),
});

const OutPatientDepartment = () => {
	const [
		// { selectedRows }, setSelectedRows
	] = useRecoilState(selectedRowsAtom);

	const columns: TableProps<any>['columns'] = [
	]

	return (
		<Fragment>
			<TableHoc<MODELS.IAppointment>
				title="Roles"
				addButtonLabel="Add Role"
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
					// list: apiService('/role/all', 'GET'),
				}}
				modifyInfoDetails={(data) => {
					if (!data) return {};
					return Object.entries(data).reduce<Record<string, string>>((acc, [key, val]) => {
						if (key === 'permissions') return { ...acc };
						return { ...acc, [key]: val };
					}, {});
				}}
			/>
		</Fragment>
	);
};

export default OutPatientDepartment;
