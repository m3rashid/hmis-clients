import React from 'react'
import Form from 'components/form'
import { useRecoilState } from 'recoil'
import { RJSFSchema } from '@rjsf/utils'
import { Typography, message } from 'antd'
import { camelCaseToSentenceCase } from 'helpers/strings'
import configAtom, { IConfigExposedState } from 'recoilAtoms/config'

const convertToFormSchema = (config: any, widgetType?: string): RJSFSchema => {
	const properties: RJSFSchema['properties'] = Object.entries(config).reduce(
		(acc, [key, value], index) => {
			return {
				...acc,
				[key]: {
					type: 'string',
					title: camelCaseToSentenceCase(key)
						.split(' ')
						.map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
						.join(' '),
					default: value,
					...(widgetType ? { format: widgetType } : {}),
					key: `${index}-${key}`,
					...(key === 'theme'
						? {
								title: '',
								oneOf: [
									{ const: 'light', title: 'Light' },
									{ const: 'dark', title: 'Dark' },
								],
						  }
						: {}),
				},
			}
		},
		{}
	)

	return {
		type: 'object',
		properties,
		required: Object.keys(config),
	}
}

interface IProps {
	title: string
	configKey: keyof IConfigExposedState
	widgetType?: string
	className?: string
}

const ConfigContainer: React.FC<IProps> = props => {
	const [config, setConfig] = useRecoilState(configAtom)

	const handleSave = (entryName: keyof IConfigExposedState) => (values: any) => {
		console.log({ values, entryName })
		setConfig({
			...config,
			[entryName]: values.formData,
		})
		message.success('Config saved successfully')
	}

	return (
		<div className={`grid gap-10 grid-cols-1 md:grid-cols-2 ${props.className}`}>
			<div className=''>
				<Typography.Title level={4} className='text-center mb-10'>
					{props.title}
				</Typography.Title>

				<br />

				<Form
					formSchema={convertToFormSchema(config[props.configKey], props.widgetType)}
					onFinishFormValues={handleSave(props.configKey)}
				/>
			</div>
		</div>
	)
}

export default ConfigContainer
