import { Descriptions } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

import { camelCaseToSentenceCase } from '../../helpers/strings';

interface IProps {
	data: Record<string, any>;
	notToShow?: string[];
}

const dateKeys = ['createdAt', 'updatedAt'];

const ObjectAsDetails: React.FC<IProps> = (props) => {
	const notToShow = [
		'_id',
		'key',
		'__v',
		'deleted',
		'password',
		'createdBy',
		'lastUpdatedBy',
		...(props.notToShow || []),
	];
	if (!props.data) return null;

	const parsedData = Object.entries(props.data).reduce<Array<{ key: string; value: string }>>(
		(acc, [key, value]) => {
			if (notToShow.includes(key)) return acc;
			else if (dateKeys.includes(key)) {
				return [
					...acc,
					{
						key: camelCaseToSentenceCase(key ?? ''),
						value: dayjs(value).format('DD-MM-YYYY HH:mm A'),
					},
				];
			}
			return [
				...acc,
				{
					key: camelCaseToSentenceCase(key ?? ''),
					value: JSON.stringify(value ?? {}).replace(/['"]+/g, ''),
				},
			];
		},
		[]
	);

	return (
		<div className="">
			<Descriptions bordered size='small' column={1}>
				{parsedData.map(({ key, value }) => {
					return <Descriptions.Item label={key}>{value}</Descriptions.Item>;
				})}
			</Descriptions>
		</div>
	);
};

export default ObjectAsDetails;
