import { Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

import { camelCaseToSentenceCase } from '../../helpers/strings';
import { useGetUi } from '../../recoil/ui';

interface IProps {
	data: Record<string, any>;
	notToShow?: string[];
}

const dateKeys = ['createdAt', 'updatedAt'];

const ObjectAsDetails: React.FC<IProps> = (props) => {
	const { isMobile } = useGetUi();
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
		<div className="flex flex-col gap-2">
			{parsedData.map(({ key, value }) => {
				return (
					<div
						className="grid gap-2"
						style={{
							gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
						}}
					>
						<Typography.Text className="font-bold">{key}</Typography.Text>
						<Typography.Text className="">{value}</Typography.Text>
					</div>
				);
			})}
		</div>
	);
};

export default ObjectAsDetails;
