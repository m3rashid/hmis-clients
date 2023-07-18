import React from 'react';
import ShowUploaded from './showUploaded';
import useUploadSelector from './useUploadSelector';
import { Button, Modal, Tabs, Typography, Upload } from 'antd';

interface IProps {
	// TODO
}

const UploadSelector: React.FC<IProps> = () => {
	const {
		onModalCancel,
		handleImageChange,
		openModal,
		state,
		handleFileScopeChange,
		onSelectUploadedFile,
	} = useUploadSelector();

	return (
		<>
			<Button onClick={openModal}>Upload</Button>
			<Modal
				open={state.modalOpen}
				onCancel={onModalCancel}
				footer={null}
				width={928}
				bodyStyle={{ maxHeight: 200 }}
				centered
				title={
					<Tabs
						defaultActiveKey="my-uploads"
						onChange={handleFileScopeChange}
						items={[
							{
								key: 'mine',
								label: 'My Uploads',
								children: (
									<ShowUploaded
										scope={state.fileScope}
										handleSelectUploaded={onSelectUploadedFile}
									/>
								),
							},
							{
								key: 'all',
								label: 'All Uploads',
								children: (
									<ShowUploaded
										scope={state.fileScope}
										handleSelectUploaded={onSelectUploadedFile}
									/>
								),
							},
							{
								key: 'new-uploads',
								label: 'Upload new File',
								children: (
									<Upload.Dragger
										multiple={false}
										style={{ padding: 10 }}
										customRequest={handleImageChange}
									>
										<p className="ant-upload-text">Click or drag file to this area to upload</p>

										<p className="ant-upload-hint">Choose a single image from your device</p>

										<br />

										<Typography.Title level={5}>
											Image must not exceed 4.5 MB in size
										</Typography.Title>

										<Typography.Text type="danger">
											Please wait for the image to upload before submitting the form. Once, preview
											is visible, you can submit the form.
										</Typography.Text>
									</Upload.Dragger>
								),
							},
						]}
					/>
				}
			>

			</Modal>
		</>
	);
};

export default UploadSelector;
