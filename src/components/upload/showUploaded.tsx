import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiService from '../../api/service';
import { Card, Image, Spin } from 'antd';
import { MODELS } from '@hmis/gatekeeper';

interface IProps {
	scope: 'all' | 'mine';
}

const ShowUploaded: React.FC<IProps> = ({ scope }) => {
	const getDataQuery = useQuery({
		queryKey: [`uploads/${scope}`],
		queryFn: async () => {
			if (scope !== 'all' && scope !== 'mine') return;
			return apiService<{ docs: MODELS.IUpload[] }, { options: { page: number; limit: number } }>(
				`/upload/${scope}`
			)({ data: { options: { page: 1, limit: 10 } } });
		},
	});

	if (getDataQuery.isFetching) {
		// loading
		return (
			<div className="h-96 flex items-center justify-center">
				<Spin />
			</div>
		);
	}

	return (
		<div className="flex flex-wrap">
			{getDataQuery.data?.data.docs.map((upload) => (
				<Card
					key={upload._id}
					className="m-2 rounded-md"
					style={{ width: 250 }}
					bodyStyle={{ padding: 0 }}
					cover={<Image alt="example" src={upload.url} width={250} preview={false} style={{ borderRadius: 8}} />}
				>
					{null}
				</Card>
			))}
		</div>
	);
};

export default ShowUploaded;
