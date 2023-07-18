import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { Spin, Typography, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';

interface IProps {
	handleImageChange: (file: RcFile) => Promise<string>;
	editImage: boolean;
}

const Uploader: React.FC<IProps> = ({ handleImageChange, editImage }) => {
	const [uploading, setUploading] = useState(false);

	const onChange: UploadProps['onChange'] = async (info) => {
		setUploading(true);
		await handleImageChange(info.file as RcFile);
		message.success('Image uploaded successfully');
		setUploading(false);
	};

	const UploadContainer: React.FC = () => {
		if (uploading) {
			return (
				<div className="h-[400px] flex flex-col items-center justify-center gap-8">
					<Spin />
					<Typography.Text>Image Uploading in progress</Typography.Text>
				</div>
			);
		}

		return (
			<Upload.Dragger
				customRequest={() => {}}
				listType="picture-card"
				height={400}
				multiple={false}
				onChange={onChange}
				showUploadList={false}
			>
				<div className="flex flex-col p-10 items-center justify-center">
					<p className="ant-upload-text">Click on this area to upload</p>
					<p className="ant-upload-hint">Choose images from your device</p>
				</div>
			</Upload.Dragger>
		);
	};

	if (editImage)
		return (
			<ImgCrop rotationSlider aspectSlider zoomSlider>
				<UploadContainer />
			</ImgCrop>
		);

	return <UploadContainer />;
};

export default Uploader;
