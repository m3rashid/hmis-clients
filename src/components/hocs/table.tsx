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
} from 'antd'
import React, { ReactNode, useEffect } from 'react'

import useTable from 'hooks/useTable'
import Form, { IHocFormProps } from 'components/form'
import { DeleteFilled, EditFilled, InfoCircleFilled } from '@ant-design/icons'

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
	routes?: {
		get?: (data?: DefaultParams) => Promise<any>
		list?: (data?: DefaultParams) => Promise<any>
		edit?: (data?: DefaultParams) => Promise<any>
		delete?: (data?: DefaultParams) => Promise<any>
	}
}

const TableHoc = <RecordType extends Record<string, any>>(props: TableHocProps<RecordType>) => {
	const {
		actions: {
			showModal,
			getData,
			handleOkOnModal,
			handleCancelOnModal,
			onFinishFormValues,
			onClickDelete,
			onClickEdit,
			onClickInfo,
		},
		state: {
			modalVisible,
			tableData,
			config,
			showDeleteAction,
			showEditAction,
			showInfoAction,
			selectedRows,
		},
		stateUpdater: { setSelectedRows },
	} = useTable<RecordType>(props)

	useEffect(() => {
		getData()
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
			<div className='flex flex-row items-center justify-between'>
				{props.showTitle ? <Typography.Title level={4}>{props.title}</Typography.Title> : <div />}
				<div className='flex items-center justify-center'>
					<div className='flex gap-2 mr-2'>
						{showInfoAction && (
							<Button
								type='primary'
								style={{ backgroundColor: config.colors.info }}
								icon={<InfoCircleFilled />}
								onClick={onClickInfo}
							>
								Info
							</Button>
						)}

						{showEditAction && (
							<Button
								type='primary'
								style={{ backgroundColor: config.colors.warning }}
								icon={<EditFilled />}
								onClick={onClickEdit}
							>
								Edit
							</Button>
						)}
						{showDeleteAction && (
							<Popconfirm
								title={<Typography.Text className='text-lg'>Delete item(s)</Typography.Text>}
								description={
									<Typography.Text className='text-base'>
										Are you sure you want to delete item(s) ?
									</Typography.Text>
								}
								onConfirm={onClickDelete}
								overlayInnerStyle={{ padding: 20 }}
								okText='Delete'
								okButtonProps={{
									style: { ...popConfirmButtonStyles, backgroundColor: config.colors.danger },
								}}
								cancelButtonProps={{ style: { ...popConfirmButtonStyles } }}
							>
								<Button
									type='primary'
									style={{ backgroundColor: config.colors.danger }}
									icon={<DeleteFilled />}
								>
									Delete
								</Button>
							</Popconfirm>
						)}
					</div>

					{props.openModalButton ?? (
						<Button type='primary' className='mx-3' onClick={showModal}>
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

	return (
		<>
			<Modal
				{...props.modalProps}
				destroyOnClose
				open={modalVisible}
				onCancel={handleCancelOnModal}
				onOk={handleOkOnModal}
				title={props.title}
				style={{ ...props.modalProps?.style }}
				footer={null}
			>
				<Form
					{...{
						formProps: props.formProps,
						formSchema: props.formSchema,
						formUiSchema: props.formUiSchema,
						onFinishFormValues,
						formBaseProps: props.formBaseProps,
					}}
				/>
			</Modal>

			{props.showTitle && (
				<>
					<Typography.Title level={3}>{props.title}</Typography.Title>
					<Divider className='m-0 p-0 mb-4' />
				</>
			)}

			<Table
				{...props.tableProps}
				dataSource={(props.tableProps.dataSource || tableData).map(t => ({ ...t, key: t._id }))}
				pagination={{
					...props.tableProps.pagination,
					position: ['bottomRight'],
					defaultPageSize: constants.defaultPageSize,
					defaultCurrent: constants.defaultPageNumber,
					hideOnSinglePage: true,
					...props.tableProps.pagination,
				}}
				style={{
					height: '100%',
					minHeight: '500px',
					...props.tableProps.style,
				}}
				rowSelection={{
					type: 'checkbox',
					selectedRowKeys: selectedRows.map(t => t._id),
					hideSelectAll: true,
					onChange: (_: React.Key[], rows: RecordType[]) => {
						setSelectedRows(rows)
					},
				}}
				sticky
				scroll={{ x: 1500 }}
				title={TablePanel}
			/>
		</>
	)
}

export default TableHoc
