import React from 'react'
import RJSFForm from '@rjsf/antd'
import validator from '@rjsf/validator-ajv8'
import { Alert, Button, FormProps } from 'antd'
import { RJSFSchema, UiSchema } from '@rjsf/utils'

interface IProps {
	formProps?: FormProps
	formUiSchema?: UiSchema
	formSchema?: RJSFSchema
	onFinishFormValues?: (formValues: any) => void
	cancelText?: string
	submitText?: string
	onCancel?: () => void
}

const Form: React.FC<IProps> = props => {
	if (!props.formSchema) return null

	return (
		<RJSFForm
			focusOnFirstError
			schema={props.formSchema}
			uiSchema={{
				'ui:ErrorListTemplate': props => {
					const { errors } = props
					return (
						<div className='mb-6 flex flex-col gap-2'>
							{errors.map((e, i) => {
								return <Alert message={e.stack as string} key={i} type='error' showIcon closable />
							})}
						</div>
					)
				},
				...props.formUiSchema,
			}}
			validator={validator}
			onSubmit={props.onFinishFormValues}
			formContext={{
				descriptionLocation: 'tooltip',
				layout: 'horizontal',
				size: 'middle',
				labelAlign: 'left',
				labelCol: { xs: { span: 24 }, sm: { span: 6 } },
				wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
				...props.formProps,
			}}
		>
			<div className='w-full flex flex-row items-center justify-end gap-3'>
				<Button onClick={props.onCancel}>{props.cancelText ?? 'Cancel'}</Button>
				<Button type='primary' htmlType='submit'>
					{props.submitText ?? 'Submit'}
				</Button>
			</div>
		</RJSFForm>
	)
}

export default Form
