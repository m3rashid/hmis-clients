import React from 'react'
import dayjs from 'dayjs'
import { camelCaseToSentenceCase, toSentenceCase } from 'helpers/strings'
import { Typography } from 'antd'

interface IProps {
	data: Record<string, any>
}

const notToShow = ['_id', 'key', '__v', 'deleted', 'actualName']
const dateKeys = ['createdAt', 'updatedAt']

const ObjectAsDetails: React.FC<IProps> = ({ data }) => {
	if (!data) return null

	const parsedData = Object.entries(data).reduce<Array<{ key: string; value: string }>>(
		(acc, [key, value]) => {
			if (notToShow.includes(key)) return acc
			else if (dateKeys.includes(key)) {
				return [
					...acc,
					{
						key: camelCaseToSentenceCase(key ?? ''),
						value: dayjs(value).format('DD-MM-YYYY HH:mm A'),
					},
				]
			}
			return [
				...acc,
				{
					key: camelCaseToSentenceCase(key ?? ''),
					value: toSentenceCase(JSON.stringify(value ?? {}).replace(/['"]+/g, ''), ' '),
				},
			]
		},
		[]
	)

	return (
		<>
			{parsedData.map(({ key, value }) => {
				return (
					<div className='grid grid-cols-2 gap-3'>
						<Typography.Text className='font-bold'>{key}</Typography.Text>
						<Typography.Text>{value}</Typography.Text>
					</div>
				)
			})}
		</>
	)
}

export default ObjectAsDetails
