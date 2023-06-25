import {
	AutoComplete,
	Button,
	Drawer,
	DrawerProps,
	Input,
	Modal,
	ModalProps,
	Popconfirm,
	Table,
	TableColumnsType,
	TableProps,
	Typography,
} from 'antd';
import dayjs from 'dayjs';
import { RecoilState } from 'recoil';
import React, { Fragment, ReactNode } from 'react';
import { DeleteFilled, EditFilled, InfoCircleFilled, PlusCircleOutlined } from '@ant-design/icons';

import useTable from './useTable';
import ObjectAsDetails from '../atoms/objectAsDetails';

export function defaultTableAtomContents<T>(): SelectedRowsAtom<T> {
	return {
		selectedRows: [],
		showDeleteAction: false,
		showEditAction: false,
		showInfoAction: false,
		formModalOpen: false,
	};
}

export interface DefaultParams {
	data?: any;
	params?: { pageSize: number; pageNumber: number };
}

export interface SelectedRowsAtom<RecordType> {
	selectedRows: RecordType[];
	showEditAction: boolean;
	showDeleteAction: boolean;
	showInfoAction: boolean;
	formModalOpen: boolean;
}

export interface TableHocProps<RecordType> {
	tableProps: TableProps<RecordType>;
	modalProps?: ModalProps;
	title: string;
	actionButtons?: ReactNode;
	hideTitle?: boolean;
	addButtonLabel?: string;
	showCreatedTime?: boolean;
	showUpdatedTime?: boolean;
	showSerialNo?: boolean;
	modifyInfoDetails?: (data: Record<string, any>) => Record<string, string>;
	notToShowInInfo?: string[];
	form?: ReactNode;
	drawerProps?: DrawerProps;
	popupType: 'modal' | 'drawer';
	editable?: boolean;
	selectedRowsAtom: RecoilState<SelectedRowsAtom<RecordType>>;
	infoModalProps?: ModalProps;
	routes: {
		list: (data?: DefaultParams) => Promise<any>;
		delete?: (data?: DefaultParams) => Promise<any>;
		details?: (data?: DefaultParams) => Promise<any>;
	};
}

const TableHoc = <RecordType extends Record<string, any> & { _id: string }>(
	props: TableHocProps<RecordType>
) => {
	const showCreatedTime = props.showCreatedTime ?? true;
	const showUpdatedTime = props.showUpdatedTime ?? true;
	const showSerialNo = props.showSerialNo ?? true;
	const { actions, state, stateUpdater } = useTable<RecordType>(props);
	const modifyInfoDetails = props.modifyInfoDetails ?? ((data: any) => data);

	const popConfirmButtonStyles: React.CSSProperties = {
		height: 34,
		paddingLeft: 16,
		paddingRight: 16,
		borderRadius: 6,
		marginTop: 10,
	};

	const showTimeEntryInTable = (title: any, dataIndex: string): TableColumnsType<RecordType> => [
		{
			title,
			dataIndex,
			key: dataIndex,
			width: 180,
			render: (t: any) => dayjs(t).format('DD-MM-YYYY HH:mm A'),
			sorter: (a: RecordType, b: RecordType, c: any) => {
				return c === 'descend'
					? dayjs(a.dataIndex).diff(dayjs(b.dataIndex)) >= 0
						? 1
						: -1
					: dayjs(a.dataIndex).diff(dayjs(b.dataIndex)) <= 0
					? 1
					: -1;
			},
		},
	];

	const TablePanel = () => (
		<div className={`flex flex-col sm:flex-row items-center justify-between`}>
			{props.hideTitle ? (
				<div />
			) : (
				<Typography.Title level={4} className="sm:pl-2 m-0 pb-0">
					{props.title}
				</Typography.Title>
			)}
			<div className="flex items-center justify-center sm:justify-end flex-grow mr-2">
				<div className="flex gap-2">
					{state.showInfoAction && (
						<Button
							type="primary"
							style={{ backgroundColor: state.config.theme.info }}
							icon={<InfoCircleFilled />}
							onClick={actions.showInfoModal}
						>
							Info
						</Button>
					)}

					{props.editable && state.showEditAction && (
						<Button
							type="primary"
							style={{ backgroundColor: state.config.theme.warning }}
							icon={<EditFilled />}
							onClick={actions.onClickEdit}
						>
							Edit
						</Button>
					)}

					{props.routes?.delete && state.showDeleteAction && (
						<Popconfirm
							title={<Typography.Text className="text-lg">Delete item(s)</Typography.Text>}
							description={
								<Typography.Text className="text-base">
									Are you sure you want to delete item(s) ?
								</Typography.Text>
							}
							onConfirm={actions.onClickDelete}
							overlayInnerStyle={{ padding: 20 }}
							okText="Delete"
							okButtonProps={{
								style: {
									...popConfirmButtonStyles,
									backgroundColor: state.config.theme.danger,
								},
							}}
							cancelButtonProps={{ style: { ...popConfirmButtonStyles } }}
						>
							<Button
								type="primary"
								style={{ backgroundColor: state.config.theme.danger }}
								icon={<DeleteFilled />}
							>
								Delete
							</Button>
						</Popconfirm>
					)}
				</div>
			</div>

			<div className="flex items-center justify-center mt-2 sm:mt-0">
				{props.actionButtons ?? (
					<Button
						type="primary"
						className="mx-3"
						onClick={actions.showFormModal}
						icon={<PlusCircleOutlined />}
					>
						{props.addButtonLabel}
					</Button>
				)}

				<AutoComplete className="w-[200]" popupMatchSelectWidth={200}>
					<Input.Search size="middle" placeholder={`Search in ${props.title}`} />
				</AutoComplete>
			</div>
		</div>
	);

	return (
		<Fragment>
			{props.popupType === 'modal' ? (
				<Modal
					destroyOnClose
					open={state.formModalVisible}
					onCancel={actions.handleCancelOnModal}
					title={props.title}
					footer={null}
					{...props.modalProps}
				>
					{props.form}
				</Modal>
			) : props.popupType === 'drawer' ? (
				<Drawer
					destroyOnClose
					open={state.formModalVisible}
					title={props.title}
					onClose={actions.handleCancelOnModal}
					footer={null}
					{...props.drawerProps}
				>
					{props.form}
				</Drawer>
			) : null}

			<Modal
				destroyOnClose
				open={state.infoModalVisible}
				onCancel={actions.onClickInfoCancel}
				onOk={actions.onClickInfoCancel}
				title={props.title + ' ' + 'Details'}
				{...props.infoModalProps}
			>
				<ObjectAsDetails
					data={modifyInfoDetails(state.selectedRows[0])}
					notToShow={props.notToShowInInfo ?? []}
				/>
			</Modal>

			<Table<RecordType>
				{...props.tableProps}
				sticky
				size="middle"
				title={TablePanel}
				scroll={{ x: 1200 }}
				rowKey={(data) => data._id}
				pagination={{
					position: ['bottomRight'],
					defaultPageSize: state.tableOptions.limit,
					defaultCurrent: state.tableOptions.page,
					total: state.tableQuery.isLoading ? [] : state.tableQuery.data.data.totalDocs,
					hideOnSinglePage: true,
					size: 'default',
					onChange: actions.onPageNumberChange,
					pageSizeOptions: ['10', '15', '20', '25', '30'],
					onShowSizeChange: actions.onPageSizeChange,
					...props.tableProps.pagination,
				}}
				columns={[
					...(showSerialNo
						? [
								{
									width: 100,
									key: 'slNo',
									title: 'Sl. No',
									render: (_: any, __: any, index: number) => (
										<div className="pl-4">
											{index + 1 + state.tableOptions.limit * (state.tableOptions.page - 1)}
										</div>
									),
								},
						  ]
						: []),
					...(props.tableProps.columns ?? []),
					...(showCreatedTime ? showTimeEntryInTable('Time Created', 'createdAt') : []),
					...(showUpdatedTime ? showTimeEntryInTable('Time Updated', 'updatedAt') : []),
				]}
				style={{ height: '100%', minHeight: '500px', ...props.tableProps.style }}
				dataSource={(props.tableProps.dataSource || state.tableQuery.isLoading
					? []
					: state.tableQuery.data.data.docs
				).map((t: any) => ({
					...t,
					key: t._id,
				}))}
				rowSelection={{
					type: 'checkbox',
					selectedRowKeys: state.selectedRows.map((t) => t._id),
					hideSelectAll: true,
					onChange: (_: React.Key[], rows: RecordType[]) => {
						stateUpdater.setSelectedRows({
							selectedRows: rows,
							showDeleteAction: rows.length > 0,
							showEditAction: rows.length === 1,
							showInfoAction: rows.length === 1,
							formModalOpen: false,
						});
					},
				}}
				onRow={(data) => ({
					onDoubleClick: () => {
						const allOthers = state.selectedRows.filter((t) => t._id !== data._id);
						const l = allOthers.length;

						if (allOthers.length === state.selectedRows.length) {
							stateUpdater.setSelectedRows({
								selectedRows: [...allOthers, data],
								showDeleteAction: l > -1,
								showEditAction: l == 0,
								showInfoAction: l == 0,
								formModalOpen: false,
							});
						} else {
							stateUpdater.setSelectedRows({
								selectedRows: allOthers,
								showDeleteAction: l > 0,
								showEditAction: l == 1,
								showInfoAction: l == 1,
								formModalOpen: false,
							});
						}
					},
				})}
			/>
		</Fragment>
	);
};

export default TableHoc;
