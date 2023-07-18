import React from 'react';
import { Modal, Tabs, Typography, Upload } from 'antd';
import useUploadSelector from './useUploadSelector';
import ShowUploaded from './showUploaded';

interface IProps {
	// TODO
}

const UploadSelector: React.FC<IProps> = () => {
	const { onModalCancel, handleImageChange, state } = useUploadSelector();

	return (
		<>
			<Modal title="Select File" open={state.modalOpen} onCancel={onModalCancel} footer={null}>
				<Tabs
					defaultActiveKey="my-uploads"
					items={[
						{
							key: 'my-uploads',
							label: 'My Uploads',
							children: <ShowUploaded scope="mine" />,
						},
						{
							key: 'all-uploads',
							label: 'All Uploads',
							children: <ShowUploaded scope="all" />,
						},
						{
							key: 'new-uploads',
							label: 'Upload new File',
							children: (
								<Upload.Dragger multiple style={{ padding: 10 }} customRequest={handleImageChange}>
									<p className="ant-upload-text">Click or drag file to this area to upload</p>

									<p className="ant-upload-hint">Choose a single image from your device</p>

									<br />

									<Typography.Title level={5}>
										Image must not exceed 4.5 MB in size
									</Typography.Title>

									<Typography.Text type="danger">
										Please wait for the image to upload before submitting the form. Once, preview is
										visible, you can submit the form.
									</Typography.Text>
								</Upload.Dragger>
							),
						},
					]}
					onChange={(...v) => console.log(v)}
				/>
			</Modal>
		</>
	);
};

export default UploadSelector;
