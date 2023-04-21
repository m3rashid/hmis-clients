import React from 'react'
import { useRecoilState } from 'recoil'
import { RJSFSchema } from '@rjsf/utils'
import configAtom, { IConfigExposedState } from 'recoilAtoms/config'
import { Typography, message } from 'antd'
import Form from 'components/atoms/form'

const convertToFormSchema = (config: any, widgetType?: string): RJSFSchema => {
	const properties: RJSFSchema['properties'] = Object.entries(config).reduce(
		(acc, [key, value], index) => {
			return {
				...acc,
				[key]: {
					type: 'string',
					title: key
						.split(' ')
						.map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
						.join(' '),
					default: value,
					...(widgetType ? { format: widgetType } : {}),
					key: `${index}-${key}`,
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

const AdminConfig = () => {
	const [config, setConfig] = useRecoilState(configAtom)

	const configsToShow: IConfigExposedState = {
		colors: config.colors,
		appColors: config.appColors,
	}

	const handleSave = (entryName: keyof IConfigExposedState) => (values: any) => {
		console.log({ values, entryName })
		setConfig({
			...config,
			[entryName]: values.formData,
		})
		message.success('Config saved successfully')
	}

	return (
		<div className='grid gap-10 grid-cols-1 md:grid-cols-2'>
			<div className=''>
				<Typography.Title level={4} className='text-center mb-10'>
					Application Colors Config
				</Typography.Title>
				<Form
					formSchema={convertToFormSchema(configsToShow['appColors'], 'color')}
					onFinishFormValues={handleSave('appColors')}
					formProps={{
						layout: 'inline',
						className: 'grid grid-cols-3',
					}}
				/>
			</div>

			<div className=''>
				<Typography.Title level={4} className='text-center mb-10'>
					Other Colors Config
				</Typography.Title>
				<Form
					formSchema={convertToFormSchema(configsToShow['colors'], 'color')}
					onFinishFormValues={handleSave('colors')}
					formProps={{
						layout: 'inline',
						className: 'grid grid-cols-3',
					}}
				/>
			</div>
		</div>
	)
}

export default AdminConfig
