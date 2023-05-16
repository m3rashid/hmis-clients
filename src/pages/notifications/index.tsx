import { RJSFSchema } from '@rjsf/utils'
import { TableProps } from 'antd'
import React from 'react'

import apiService from 'api/service'
import TableHoc from 'components/hocs/table'

const Notifications = () => {
	const columns: TableProps<any>['columns'] = [
		{ title: 'Title', dataIndex: 'title', key: 'title', width: 250 },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		properties: {
			title: {
				type: 'string',
				title: 'Title',
			},
			description: {
				type: 'string',
				title: 'Description',
				format: 'textarea',
			},
		},
		required: ['title', 'description'],
	}

	const handleFormSubmit = (data: any) => {
		const { title, description } = data.formData
		console.log({ title, description })
	}

	return (
		<>
			<TableHoc
				title='Notifications'
				addButtonLabel='New Notification'
				modalProps={{
					title: 'New Notification',
					width: 600,
				}}
				submitText='Save and Release'
				cancelText='Save as Draft'
				onFinishFormValues={handleFormSubmit}
				tableProps={{
					columns: columns,
					scroll: { x: 1000 },
				}}
				formBaseProps={{}}
				routes={{
					get: apiService('GET', '/notification/all'),
					create: apiService('POST', '/notification'),
				}}
				formSchema={formSchema}
			/>
		</>
	)
}

export default Notifications
