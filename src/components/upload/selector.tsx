import React from 'react';
import Uploader from './uploader';
import ShowUploaded from './showUploaded';
import { Button, Modal, Tabs } from 'antd';
import useUploadSelector, { IProps } from './useUploadSelector';

const UploadSelector: React.FC<IProps> = (props) => {
	const {
		onModalCancel,
		handleImageChange,
		openModal,
		state,
		handleFileScopeChange,
		onSelectUploadedFile,
		handleSelectedFiles,
	} = useUploadSelector(props);

	return (
		<>
			<Button onClick={openModal}>Upload</Button>
			<Modal
				open={state.modalOpen}
				onCancel={onModalCancel}
				footer={null}
				width={940}
				title={
					<Tabs
						defaultActiveKey="my-uploads"
						onChange={handleFileScopeChange}
						items={[
							{ key: 'mine', label: 'My Uploads' },
							{ key: 'all', label: 'All Uploads' },
							{ key: 'new-uploads', label: 'Upload new File' },
						]}
					/>
				}
			>
				<div className="max-h-[500px] h-auto overflow-auto shadow-inner">
					{state.fileScope ? (
						<div>
							{state.selectedFiles.length > 0 ? (
								<div className="flex flex-wrap gap-4 my-2 items-center justify-end">
									<Button onClick={handleSelectedFiles}>Use Selected Files</Button>
								</div>
							) : null}
							<ShowUploaded
								scope={state.fileScope}
								handleSelectUploaded={onSelectUploadedFile}
								selectedFiles={state.selectedFiles}
							/>
						</div>
					) : (
						<Uploader handleImageChange={handleImageChange} editImage={props.editImage ?? false} />
					)}
				</div>
			</Modal>
		</>
	);
};

export default UploadSelector;
