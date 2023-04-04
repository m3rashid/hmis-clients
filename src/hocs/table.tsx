import {
	Divider,
	Modal,
	ModalProps,
	TableProps,
	Table,
	Typography,
	Button,
	// Form,
	FormProps,
	AutoComplete,
	Input,
	Alert,
} from 'antd'
import React, { ReactNode, useEffect } from 'react'
import Form from '@rjsf/antd'
import validator from '@rjsf/validator-ajv8'
import { RJSFSchema, UiSchema } from '@rjsf/utils'

import useTable from 'hooks/useTable'
// import FormBuilder from '../formBuilder'
// import { IMeta } from '../formBuilder/FormBuilder'

export const constants = {
	defaultPageSize: 10,
	defaultPageNumber: 1,
}

export interface IProps {
	tableProps: TableProps<any>
	modalProps?: ModalProps
	title: string
	ActionButtons: ReactNode
	openModalButton?: ReactNode
	baseRouteForData: string
	showTitle?: boolean
	formProps?: FormProps
	addButtonLabel?: string
	formUiSchema?: UiSchema
	formSchema?: RJSFSchema
}

const TableHoc: React.FC<IProps> = ({
	tableProps,
	modalProps,
	title,
	ActionButtons,
	openModalButton,
	baseRouteForData,
	formProps,
	showTitle = true,
	addButtonLabel = `Add ${title}`,
	formSchema,
	formUiSchema,
}) => {
	const {
		actions: { showModal, getData, handleOkOnModal, handleCancelOnModal, onFinishFormValues },
		state: { modalVisible, tableData },
	} = useTable({ baseRoute: baseRouteForData })

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Modal
				{...modalProps}
				destroyOnClose
				open={modalVisible}
				onCancel={handleCancelOnModal}
				onOk={handleOkOnModal}
				title={title}
				style={{ ...modalProps?.style }}
				footer={null}
			>
				{formSchema && (
					<Form
						focusOnFirstError
						schema={formSchema}
						uiSchema={{
							'ui:ErrorListTemplate': props => {
								const { errors } = props
								return (
									<div className='mb-6 flex flex-col gap-2'>
										{errors.map((e, i) => {
											return (
												<Alert message={e.stack as string} key={i} type='error' showIcon closable />
											)
										})}
									</div>
								)
							},
							...formUiSchema,
						}}
						validator={validator}
						onSubmit={onFinishFormValues}
						formContext={{
							descriptionLocation: 'tooltip',
							layout: 'horizontal',
							size: 'middle',
							labelAlign: 'left',
							labelCol: { xs: { span: 24 }, sm: { span: 6 } },
							wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
							...formProps,
						}}
					>
						<div className='w-full flex flex-row items-center justify-end gap-3'>
							<Button>Cancel</Button>
							<Button type='primary' htmlType='submit'>
								Do not Submit
							</Button>
						</div>
					</Form>
				)}
			</Modal>

			{showTitle && (
				<>
					<Typography.Title level={3}>{title}</Typography.Title>
					<Divider className='m-0 p-0 mb-4' />
				</>
			)}

			<div className='flex flex-row items-center justify-end mb-4'>
				<div className='w-4' />

				<div className='flex items-center justify-center'>
					{ActionButtons}

					{openModalButton ?? (
						<Button type='primary' className='mx-3' onClick={showModal}>
							{addButtonLabel}
						</Button>
					)}

					<AutoComplete className='w-[200]' dropdownMatchSelectWidth={200}>
						<Input.Search size='middle' placeholder={`Search in ${title}`} />
					</AutoComplete>
				</div>
			</div>

			<div className='overflow-x-auto max-w-[100vw] mb-24 bg-white'>
				<Table
					{...tableProps}
					dataSource={tableProps.dataSource || tableData}
					pagination={{
						...tableProps.pagination,
						position: ['bottomRight'],
						defaultPageSize: constants.defaultPageSize,
						defaultCurrent: constants.defaultPageNumber,
						hideOnSinglePage: true,
						...tableProps.pagination,
					}}
					style={{
						...tableProps.style,
						height: '100%',
					}}
				/>
			</div>
		</>
	)
}

export default TableHoc
