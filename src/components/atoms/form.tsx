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
}

const Form: React.FC<IProps> = ({ formProps, formSchema, formUiSchema, onFinishFormValues }) => {
	if (!formSchema) return null

	return (
		<RJSFForm
			focusOnFirstError
			schema={formSchema}
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
					Submit
				</Button>
			</div>
		</RJSFForm>
	)
}

export default Form
