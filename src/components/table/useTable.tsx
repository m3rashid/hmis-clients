import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';
import apiService from '../../api/service';
import { defaultTableAtomContents } from './index';
import { ITableOptions, TableHocProps } from './types';
import { IConfig, configDefaultState } from '../../recoil/config';

const useTable = <RecordType extends Record<string, any> & { _id: string }>(
	props: TableHocProps<RecordType>
) => {
	const [table, setTable] = useState<ITableOptions>({ limit: 10, page: 1 });
	const onPageNumberChange = (page: number) => {
		setTable((p) => ({ ...p, page }));
	};

	const onPageSizeChange = (page: number, limit: number) => {
		setTable({ page, limit });
	};

	const { data: configResponse } = useQuery({
		queryKey: ['config'],
		queryFn: () => apiService('/config', 'GET')(),
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});
	const config: IConfig = configResponse?.data || configDefaultState;

	const tableQuery = useQuery({
		queryKey: [
			props.title,
			table.limit,
			table.page,
			props.listBody?.options,
			props.listBody?.query,
		],
		queryFn: () =>
			props.routes?.list({
				data: {
					query: props.listBody?.query,
					options: {
						...props.listBody?.options,
						page: table.page,
						limit: table.limit,
					},
				},
			}),
	});

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
			tableQuery,
			formModalVisible: formModalOpen,
			loading,
			selectedRows,
			tableOptions: table,
			// constants
			showDeleteAction,
			showEditAction,
			showInfoAction,
			config,
			infoModalVisible,
		},

		stateUpdater: {
			// setTableData,
			setLoading,
			setSelectedRows,
			setInfoModalVisible,
		},

		actions: {
			hideFormModal,
			showFormModal,
			hideInfoModal,
			showInfoModal,
			// getData,
			deleteData,
			handleCancelOnModal,
			onClickEdit,
			onClickInfoCancel,
			onClickDelete,
			onPageNumberChange,
			onPageSizeChange,
		},
	};
};

export default useTable;
