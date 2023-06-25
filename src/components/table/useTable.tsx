import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import apiService from '../../api/service';
import { TableHocProps, defaultTableAtomContents } from './index';
import type { MODELS } from '@hmis/gatekeeper';
import { IConfig, configDefaultState } from '../../recoil/config';
import { useRecoilState } from 'recoil';

const useTable = <RecordType extends Record<string, any> & { _id: string }>(
	props: TableHocProps<RecordType>
) => {
	const defaultTableResponse: MODELS.PaginatedListIResponse<RecordType> = {
		docs: [],
		totalDocs: 0,
		limit: 15,
		totalPages: 1,
		page: 1,
		pagingCounter: 1,
		hasPrevPage: false,
		hasNextPage: false,
		prevPage: null,
		nextPage: null,
	};

	const [tableData, setTableData] =
		useState<MODELS.PaginatedListIResponse<RecordType>>(defaultTableResponse);

	const { data: configResponse } = useQuery({
		queryKey: ['config'],
		queryFn: () => apiService('/config', 'GET')(),
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});
	const config: IConfig = configResponse?.data || configDefaultState;

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const resetModalValues = {
		selectedRows: [],
		showDeleteAction: false,
		showEditAction: false,
		showInfoAction: false,
	};

	const [infoModalVisible, setInfoModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [
		{ selectedRows, showEditAction, formModalOpen, showDeleteAction, showInfoAction },
		setSelectedRows,
	] = useRecoilState(props.selectedRowsAtom);

	const hideFormModal = () => setSelectedRows((p) => ({ ...p, formModalOpen: false }));
	const showFormModal = () => setSelectedRows((p) => ({ ...p, formModalOpen: true }));

	const hideInfoModal = () => setInfoModalVisible(false);
	const showInfoModal = () => setInfoModalVisible(true);

	const onClickEdit = () => {
		showFormModal();
	};

	const onClickDelete = async () => {
		const promises = selectedRows.map((t) => deleteData(t._id));
		const responses = await Promise.all(promises);
		console.log({ responses });
		setSelectedRows((p) => ({ ...p, ...resetModalValues }));
	};

	const onClickInfoCancel = () => {
		hideInfoModal();
		setSelectedRows((p) => ({ ...p, ...resetModalValues }));
	};

	const getData = async () => {
		if (!props.routes?.list) return;
		try {
			setLoading(true);
			const { data: response } = await props.routes.list();
			// console.log({ response });
			setTableData(response);
		} catch (err) {
			setTableData(defaultTableResponse);
		} finally {
			setLoading(false);
		}
	};

	const deleteData = async (id: string) => {
		if (!props.routes?.delete) return;
		try {
			setLoading(true);
			const { data: response } = await props.routes.delete({ data: { _id: id } });
			console.log({ response });
		} catch (err) {
		} finally {
			setLoading(false);
		}
	};

	const handleCancelOnModal = () => {
		hideFormModal();
		setSelectedRows(defaultTableAtomContents<RecordType>());
	};

	return {
		state: {
			tableData,
			formModalVisible: formModalOpen,
			loading,
			selectedRows,

			// constants
			showDeleteAction,
			showEditAction,
			showInfoAction,
			config,
			infoModalVisible,
		},

		stateUpdater: {
			setTableData,
			setLoading,
			setSelectedRows,
			setInfoModalVisible,
		},

		actions: {
			hideFormModal,
			showFormModal,
			hideInfoModal,
			showInfoModal,
			getData,
			deleteData,
			handleCancelOnModal,
			onClickEdit,
			onClickInfoCancel,
			onClickDelete,
		},
	};
};

export default useTable;
