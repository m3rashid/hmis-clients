import React from 'react';
import { Empty, Spin } from 'antd';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import RenderSingleFile from './singleFile';
import { useQuery } from '@tanstack/react-query';

interface IProps {
	scope: 'all' | 'mine';
	handleSelectUploaded: (url: string) => void;
}

const ShowUploaded: React.FC<IProps> = ({ scope, handleSelectUploaded }) => {
	const getDataQuery = useQuery({
		queryKey: [`uploads/${scope}`],
		queryFn: async () => {
			if (scope !== 'all' && scope !== 'mine') return;
			return apiService<{ docs: MODELS.IUpload[] }, { options: { page: number; limit: number } }>(
				`/upload/${scope}`
			)({ data: { options: { page: 1, limit: 8 } } });
		},
	});

	if (getDataQuery.isFetching) {
		// loading
		return (
			<div className="h-80 flex items-center justify-center">
				<Spin />
			</div>
		);
	}

	return (
		<div className="flex flex-wrap gap-4 shadow-inner">
			{(getDataQuery.data?.data.docs.length || 0) > 0 ? (
				getDataQuery.data?.data.docs.map((file) => (
					<div className="w-52 h-40 cursor-pointer" key={file._id} onClick={() => handleSelectUploaded(file.url)}>
						<RenderSingleFile file={file} />
					</div>
				))
			) : (
				<div className="h-80 w-full flex items-center justify-center">
					<Empty description="No uploads found" />
				</div>
			)}
		</div>
	);
};

export default ShowUploaded;
