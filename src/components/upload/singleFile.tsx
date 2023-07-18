import React from 'react';
import { MODELS } from '@hmis/gatekeeper';
import { Typography } from 'antd';

interface IProps {
	file: MODELS.IUpload;
}

const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
const videoFormats = ['mp4', 'mkv', 'avi', 'webm'];
const audioFormats = ['mp3', 'wav', 'ogg'];
const pdfFormats = ['pdf'];
const docFormats = ['doc', 'docx'];
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

const getColorGradient = (format: string) => {
	if (imageFormats.includes(format)) return 'bg-gradient-to-r from-blue-500 to-purple-500';
	if (videoFormats.includes(format)) return 'bg-gradient-to-r from-red-500 to-yellow-500';
	if (audioFormats.includes(format)) return 'bg-gradient-to-r from-green-500 to-blue-500';
	if (pdfFormats.includes(format)) return 'bg-gradient-to-r from-red-500 to-yellow-500';
	if (docFormats.includes(format)) return 'bg-gradient-to-r from-red-500 to-yellow-500';
	if (xlsFormats.includes(format)) return 'bg-gradient-to-r from-red-500 to-yellow-500';
	if (pptFormats.includes(format)) return 'bg-gradient-to-r from-red-500 to-yellow-500';
	return 'bg-gradient-to-br from-gray-500 to-gray-700';
};

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
			<div
				className="hover:shadow-xl group rounded-md h-40 flex items-center justify-center bg-slate-400 text-white relative"
				// style={{borderLeft: '50px solid #6366f1', borderRight: '50px solid #6366f1'}}
			>
				<div className="absolute h-10 w-10 bg-black top-0 left-0 rounded-br-[40px] rounded-tl-md group-hover:h-28 group-hover:w-28 group-hover:rounded-br-[112px] group-hover:opacity-20 group-hover:duration-150"></div>
				<p className="mt-0 mb-0 font-bold text-lg">{otherFormat.toUpperCase()}</p>
			</div>
		);
	}

	return null;
};

export default RenderSingleFile;
