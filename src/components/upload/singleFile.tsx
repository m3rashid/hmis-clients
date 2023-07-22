import dayjs from 'dayjs';
import React from 'react';
import { Typography } from 'antd';
import { MODELS } from '@hmis/gatekeeper';

interface IProps {
	file: MODELS.IUpload;
}

const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
const videoFormats = ['mp4', 'mkv', 'avi', 'webm'];
const audioFormats = ['mp3', 'wav', 'ogg'];
const pdfFormats = ['pdf'];
const docFormats = ['doc', 'docx', 'plain', 'text'];
const xlsFormats = ['xls', 'xlsx', 'sheet'];
const pptFormats = ['ppt', 'pptx'];

const otherFormats = [
	...videoFormats,
	...audioFormats,
	...pdfFormats,
	...docFormats,
	...xlsFormats,
	...pptFormats,
];

const RenderSingleFile: React.FC<IProps> = ({ file }) => {
	if (!file) return null;
	const getFileName = (name: string) => {
		const [fileName, fileExt] = name.split('.');
		if (fileName.length > 30) {
			return `${fileName.substring(0, 20)}...${fileExt}`;
		}
		return name;
	};

	const ShowMetaData = () => (
		<div className="absolute bottom-0 p-1 w-full text-center bg-blue-200 rounded-b-md">
			<Typography.Text className="text-gray-500" strong>
				{getFileName(file.name)}
			</Typography.Text>
			<br />
			<Typography.Text type="secondary">
				{dayjs(file.createdAt).format('hh:mm A, ddd DD MMMM, YYYY')}
			</Typography.Text>
		</div>
	);

	if (imageFormats.includes(file.format)) {
		return (
			<div
				className="justify-center bg-no-repeat bg-cover bg-center hover:shadow-xl rounded-md h-48 max-w-52 relative"
				style={{ backgroundImage: `url(${file.url})` }}
			>
				<ShowMetaData />
			</div>
		);
	}

	let otherFormat = '';
	if (otherFormats.includes(file.format)) otherFormat = file.format;
	file.format.split('.').forEach((f) => {
		if (otherFormats.includes(f)) otherFormat = f;
	});

	if (otherFormat) {
		return (
			<div className="hover:shadow-xl group rounded-md h-48 flex flex-col items-center bg-red-400 relative">
				<div className="absolute h-10 w-10 bg-gray-600 top-0 left-0 rounded-br-[40px] rounded-tl-md group-hover:h-36 group-hover:w-36 group-hover:rounded-br-[144px] group-hover:opacity-20 group-hover:duration-150"></div>
				<Typography.Text className="font-bold mt-16 text-white text-lg">
					{otherFormat.toUpperCase()}
				</Typography.Text>
				<ShowMetaData />
			</div>
		);
	}

	return null;
};

export default RenderSingleFile;
