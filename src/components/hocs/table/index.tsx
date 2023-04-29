import {
	Divider,
	Modal,
	ModalProps,
	TableProps,
	Table,
	Typography,
	Button,
	AutoComplete,
	Input,
	Popconfirm,
	TableColumnsType,
} from 'antd'
import React, { ReactNode, useEffect } from 'react'

import useTable from 'components/hocs/table/useTable'
import Form, { IHocFormProps } from 'components/form'
import { DeleteFilled, EditFilled, InfoCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import ObjectAsDetails from 'components/atoms/objectAsDetails'

export const constants = {
	defaultPageSize: 10,
	defaultPageNumber: 1,
}

export interface DefaultParams {
	data?: any
}

export interface TableHocProps<RecordType> extends IHocFormProps {
	tableProps: TableProps<RecordType>
	modalProps?: ModalProps
	title: string
	openModalButton?: ReactNode
	showTitle?: boolean
	addButtonLabel?: string
	showCreatedTime?: boolean
	showUpdatedTime?: boolean
	modifyInfoDetails?: (data: Record<string, any>) => Record<string, string>
	notToShowInInfo?: string[]
	routes?: {
		get?: (data?: DefaultParams) => Promise<any>
		list?: (data?: DefaultParams) => Promise<any>
		edit?: (data?: DefaultParams) => Promise<any>
		delete?: (data?: DefaultParams) => Promise<any>
		details?: (data?: DefaultParams) => Promise<any>
	}
}

const TableHoc = <RecordType extends Record<string, any>>(props: TableHocProps<RecordType>) => {
	const showTitle = props.showTitle || true
	const showCreatedTime = props.showCreatedTime ?? true
	const showUpdatedTime = props.showUpdatedTime ?? true
	const { actions, state, stateUpdater } = useTable<RecordType>(props)
	const modifyInfoDetails = props.modifyInfoDetails ?? ((data: any) => data)

	useEffect(() => {
		actions.getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const popConfirmButtonStyles: React.CSSProperties = {
		height: 34,
		paddingLeft: 16,
		paddingRight: 16,
		borderRadius: 6,
		marginTop: 10,
	}

	const TablePanel = (/* tableDataOnThisPage: any */) => {
		return (
			<div className={`flex flex-col sm:flex-row items-center justify-between`}>
				{showTitle ? (
					<Typography.Title level={4} className='sm:pl-2 m-0 pb-0'>
						{props.title}
					</Typography.Title>
				) : (
					<div />
				)}
				<div className='flex items-center justify-center sm:justify-end flex-grow'>
					<div className='flex gap-2'>
						{state.showInfoAction && (
							<Button
								type='primary'
								style={{ backgroundColor: state.config.colors.info }}
								icon={<InfoCircleFilled />}
								onClick={actions.showInfoModal}
							>
								Info
							</Button>
						)}

						{props.routes?.edit && state.showEditAction && (
							<Button
								type='primary'
								style={{ backgroundColor: state.config.colors.warning }}
								icon={<EditFilled />}
								onClick={actions.onClickEdit}
							>
								Edit
							</Button>
						)}
						{props.routes?.delete && state.showDeleteAction && (
							<Popconfirm
								title={<Typography.Text className='text-lg'>Delete item(s)</Typography.Text>}
								description={
									<Typography.Text className='text-base'>
										Are you sure you want to delete item(s) ?
									</Typography.Text>
								}
								onConfirm={actions.onClickDelete}
								overlayInnerStyle={{ padding: 20 }}
								okText='Delete'
								okButtonProps={{
									style: { ...popConfirmButtonStyles, backgroundColor: state.config.colors.danger },
								}}
								cancelButtonProps={{ style: { ...popConfirmButtonStyles } }}
							>
								<Button
									type='primary'
									style={{ backgroundColor: state.config.colors.danger }}
									icon={<DeleteFilled />}
								>
									Delete
								</Button>
							</Popconfirm>
						)}
					</div>
				</div>

				<div className='flex items-center justify-center mt-2 sm:mt-0'>
					{props.openModalButton ?? (
						<Button type='primary' className='mx-3' onClick={actions.showFormModal}>
							{props.addButtonLabel}
						</Button>
					)}

					<AutoComplete className='w-[200]' dropdownMatchSelectWidth={200}>
						<Input.Search size='middle' placeholder={`Search in ${props.title}`} />
					</AutoComplete>
				</div>
			</div>
		)
	}

	const showTimeEntryInTable = (title: any, dataIndex: string): TableColumnsType<RecordType> => [
		{
			title,
			dataIndex,
			key: dataIndex,
			width: 170,
			render: (t: any) => dayjs(t).format('DD-MM-YYYY HH:mm A'),
			sorter: (a: RecordType, b: RecordType, c: any) => {
				return c === 'descend'
					? dayjs(a.dataIndex).diff(dayjs(b.dataIndex)) >= 0
						? 1
						: -1
					: dayjs(a.dataIndex).diff(dayjs(b.dataIndex)) <= 0
					? 1
					: -1
			},
		},
	]

	return (
		<>
			<Modal
				{...props.modalProps}
				destroyOnClose
				open={state.formModalVisible}
				onCancel={actions.handleCancelOnModal}
				onOk={actions.handleOkOnModal}
				title={props.title}
				style={{ ...props.modalProps?.style }}
				footer={null}
			>
				<Form
					{...{
						formProps: props.formProps,
						formSchema: props.formSchema,
						formUiSchema: props.formUiSchema,
						onFinishFormValues: actions.onFinishFormValues,
						formBaseProps: props.formBaseProps,
						cancelText: props.cancelText,
						onCancel: actions.handleCancelOnModal,
						submitText: props.submitText,
					}}
				/>
			</Modal>

			<Modal
				destroyOnClose
				open={state.infoModalVisible}
				onCancel={actions.onClickInfoCancel}
				onOk={actions.onClickInfoCancel}
				title={props.title + ' ' + 'Details'}
			>
				<ObjectAsDetails
					data={modifyInfoDetails(state.selectedRows[0])}
					notToShow={props.notToShowInInfo ?? []}
				/>
			</Modal>

			{props.showTitle && (
				<>
					<Typography.Title level={3}>{props.title}</Typography.Title>
					<Divider className='m-0 p-0 mb-4' />
				</>
			)}

			<Table<RecordType>
				{...props.tableProps}
				sticky
				size='middle'
				title={TablePanel}
				scroll={{ x: 1200 }}
				rowKey={data => data._id}
				pagination={{
					position: ['bottomRight'],
					defaultPageSize: constants.defaultPageSize,
					defaultCurrent: constants.defaultPageNumber,
					size: 'default',
					...props.tableProps.pagination,
				}}
				columns={[
					...(props.tableProps.columns ?? []),
					...(showCreatedTime ? showTimeEntryInTable('Time Created', 'createdAt') : []),
					...(showUpdatedTime ? showTimeEntryInTable('Time Updated', 'updatedAt') : []),
				]}
				style={{ height: '100%', minHeight: '500px', ...props.tableProps.style }}
				dataSource={(props.tableProps.dataSource || state.tableData).map(t => ({
					...t,
					key: t._id,
				}))}
				rowSelection={{
					type: 'checkbox',
					selectedRowKeys: state.selectedRows.map(t => t._id),
					hideSelectAll: true,
					onChange: (_: React.Key[], rows: RecordType[]) => {
						stateUpdater.setSelectedRows(rows)
					},
				}}
				onRow={data => ({
					onDoubleClick: () => {
						const allOthers = state.selectedRows.filter(t => t._id !== data._id)
						if (allOthers.length === state.selectedRows.length) {
							stateUpdater.setSelectedRows(prev => [...prev, data])
						} else stateUpdater.setSelectedRows(allOthers)
					},
				})}
			/>
		</>
	)
}

export default TableHoc
