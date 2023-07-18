import dayjs from 'dayjs';
import React from 'react';
import { Typography } from 'antd';
import { MODELS } from '@hmis/gatekeeper';
import { UploadOutlined } from '@ant-design/icons';

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
	if (imageFormats.includes(file.format)) {
		return (
			<div
				className="justify-center bg-no-repeat bg-cover bg-center hover:shadow-xl rounded-md h-40 max-w-52"
				style={{ backgroundImage: `url(${file.url})` }}
			/>
		);
	}

	let otherFormat = '';
	if (otherFormats.includes(file.format)) otherFormat = file.format;
	file.format.split('.').forEach((f) => {
		if (otherFormats.includes(f)) otherFormat = f;
	});

	if (otherFormat) {
		return (
			<div className="hover:shadow-xl group rounded-md h-40 flex flex-col items-center justify-center bg-red-400 relative">
				<div className="absolute h-10 w-10 bg-gray-600 top-0 left-0 rounded-br-[40px] rounded-tl-md group-hover:h-36 group-hover:w-36 group-hover:rounded-br-[144px] group-hover:opacity-20 group-hover:duration-150"></div>
				<Typography.Text className="mt-0 mb-0 font-bold text-white text-lg">
					{otherFormat.toUpperCase()}
				</Typography.Text>
				<br />

				<div>
					<Typography.Text type='secondary' className="text-center">
						<UploadOutlined /> &nbsp; Uploaded on
					</Typography.Text>
					<br />
					<Typography.Text type='secondary' className="text-center">
						{dayjs(file.createdAt).format('ddd DD MMMM, YYYY')}
					</Typography.Text>
				</div>
			</div>
		);
	}

	return null;
};

export default RenderSingleFile;
