import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import RenderSingleFile from './singleFile';
import { Button, Checkbox, Empty, Spin } from 'antd';
import { useIntersection } from '@mantine/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { FileScope, SelectedFile } from './types';
import { useInfiniteQuery } from '@tanstack/react-query';
import ShowFilePreview from './showFilePreview';

interface IProps {
	scope: FileScope;
	selectedFiles: Array<SelectedFile>;
	handleSelectUploaded: (data: MODELS.IUpload) => void;
}

const ShowUploaded: React.FC<IProps> = ({ scope, handleSelectUploaded, selectedFiles }) => {
	const lastPostRef = useRef<HTMLElement>(null);
	const [filePreview, setFilePreview] = useState<MODELS.IUpload | null>(null);

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

	const handleShowPreview = (file: MODELS.IUpload) => {
		setFilePreview(file);
	};

	if (getDataQuery.isFetching) {
		return (
			<div className="h-80 flex items-center justify-center">
				<Spin />
			</div>
		);
	}

	return (
		<div className="flex flex-wrap gap-4">
			<ShowFilePreview file={filePreview} setFilePreview={setFilePreview} />

			{(files.length || 0) > 0 ? (
				files.map((file, i) => {
					const selected = selectedFiles.find((f) => f._id === file._id);
					return (
						<div
							key={file._id}
							className="w-52 h-48 cursor-pointer relative"
							onDoubleClick={() => handleSelectUploaded(file)}
							{...(files.length === i + 1 ? { ref: ref } : {})}
						>
							<div className="absolute top-1 right-2 z-20 flex items-center justify-center gap-2">
								<Button
									size="small"
									type="dashed"
									className="border-none p-0 shadow-md"
									onClick={() => handleShowPreview(file)}
								>
									Preview
								</Button>
								<Checkbox checked={!!selected} onChange={() => handleSelectUploaded(file)} />
							</div>
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
