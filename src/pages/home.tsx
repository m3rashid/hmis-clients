import { RJSFSchema } from '@rjsf/utils'
import TableHoc from 'hocs/table'
import React from 'react'

const Home = () => {
	const columns = [
		{ title: 'ID', dataIndex: 'id', key: 'id' },
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Phone', dataIndex: 'phone', key: 'phone' },
		{ title: 'Username', dataIndex: 'username', key: 'username' },
		{ title: 'Website', dataIndex: 'website', key: 'website' },
	]

	const formSchema: RJSFSchema = {
		type: 'object',
		required: ['firstName', 'lastName'],
		properties: {
			firstName: {
				type: 'string',
				title: 'First name',
				default: 'Chuck',
			},
			lastName: {
				type: 'string',
				title: 'Last name',
			},
			age: {
				type: 'integer',
				title: 'Age',
			},
			bio: {
				type: 'string',
				title: 'Bio',
			},
			password: {
				type: 'string',
				title: 'Password',
				minLength: 3,
			},
			telephone: {
				type: 'string',
				title: 'Telephone',
				minLength: 10,
			},
		},
	}

	return (
		<div>
			<TableHoc
				title='Test Table'
				tableProps={{
					columns: columns,
					dataSource: [],
					style: {
						minHeight: '500px',
					},
				}}
				formSchema={formSchema}
				showTitle={false}
				baseRouteForData='/'
				ActionButtons={<></>}
			/>
		</div>
	)
}

export default Home
