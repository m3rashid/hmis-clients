import { Empty, Spin } from 'antd';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import RenderSingleFile from './singleFile';
import { useIntersection } from '@mantine/hooks';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

interface IProps {
	scope: 'all' | 'mine';
	handleSelectUploaded: (url: string, format: string) => void;
}

const ShowUploaded: React.FC<IProps> = ({ scope, handleSelectUploaded }) => {
	const lastPostRef = useRef<HTMLElement>(null);

	const getDataQuery = useInfiniteQuery({
		queryKey: [`uploads/${scope}`],
		queryFn: async ({ pageParam = 1 }) => {
			return apiService<
				{ docs: MODELS.IUpload[]; hasNextPage: boolean },
				{ options: object; query: object }
			>(`/upload/${scope}`)({
				data: {
					options: { page: pageParam, limit: 12, sort: { createdAt: -1 } },
					query: { deleted: false },
				},
			});
		},
		getNextPageParam: (_, pages) => pages.length + 1,
		initialData: { pageParams: [1], pages: [] },
	});

	const { entry, ref } = useIntersection({
		root: lastPostRef.current,
		threshold: 1,
	});

	const files = getDataQuery.data?.pages.flatMap((page) => page.data.docs) || [];

	useEffect(() => {
		if (entry?.isIntersecting && getDataQuery.data?.pages.at(-1)?.data.hasNextPage) {
			getDataQuery.fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [entry]);

	if (getDataQuery.isFetching) {
		return (
			<div className="h-80 flex items-center justify-center">
				<Spin />
			</div>
		);
	}

	return (
		<div className="flex flex-wrap gap-4">
			{(files.length || 0) > 0 ? (
				files.map((file, i) => {
					return (
						<div
							className="w-52 h-40 cursor-pointer"
							key={file._id}
							onClick={() => handleSelectUploaded(file.url, file.format)}
							{...(files.length === i + 1 ? { ref: ref } : {})}
						>
							<RenderSingleFile file={file} />
						</div>
					);
				})
			) : (
				<div className="h-80 w-full flex items-center justify-center">
					<Empty description="No uploads found" />
				</div>
			)}
		</div>
	);
};

export default ShowUploaded;
