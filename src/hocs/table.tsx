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
	Switch,
} from 'antd'
import React, { ReactNode, useEffect } from 'react'

import useTable from 'hooks/useTable'
import Form, { IHocFormProps } from 'components/form'

export const constants = {
	defaultPageSize: 10,
	defaultPageNumber: 1,
}

export interface TableHocProps extends IHocFormProps {
	tableProps: TableProps<any>
	modalProps?: ModalProps
	title: string
	ActionButtons: ReactNode
	openModalButton?: ReactNode
	showTitle?: boolean
	addButtonLabel?: string
	routes?: {
		get?: string
		list?: string
		edit?: string
		delete?: string
	}
}

const TableHoc: React.FC<TableHocProps> = props => {
	const {
		actions: { showModal, getData, handleOkOnModal, handleCancelOnModal, onFinishFormValues },
		state: { modalVisible, tableData },
	} = useTable(props)

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

			<div className='flex flex-row items-center justify-end mb-4'>
				<div className='w-4' />

				<div className='flex items-center justify-center'>
					{props.ActionButtons}

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

			<Table
				{...props.tableProps}
				dataSource={props.tableProps.dataSource || tableData}
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
				sticky
				scroll={{ x: 1500 }}
			/>
		</>
	)
}

export default TableHoc
