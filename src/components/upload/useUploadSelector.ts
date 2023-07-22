import axios from 'axios';
import { message } from 'antd';
import { useState } from 'react';
import { FileScope } from './types';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';
import { UploadFile } from 'antd/es/upload';

export interface IProps {
	maxSelectFiles?: number;
	activeKey?: FileScope | null;
	handleSelectedFiles?: (files: MODELS.IUpload[]) => Promise<void>;
	editImage?: boolean;
}

const useUploadSelector = (props: IProps) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<MODELS.IUpload[]>([]);
	const [fileScope, setFileScope] = useState<FileScope | null>(props.activeKey || 'mine');

	const openModal = () => setModalOpen(true);

	const handleFileScopeChange = (scope: string) => {
		if (scope === 'all' || scope === 'mine') {
			setFileScope(scope);
			return;
		}
		setFileScope(null);
	};

	const onSelectUploadedFile = async (data: MODELS.IUpload) => {
		setSelectedFiles((prev) => {
			const filtered = prev.filter((file) => file._id !== data._id);
			return [...(filtered.length === prev.length ? [...filtered, data] : filtered)];
		});
	};

	const handleSelectedFiles = async () => {
		console.log(selectedFiles);
		if (props.handleSelectedFiles) {
		}
	};

	const handleImageChange = async (file: UploadFile) => {
		if (!file || !file.originFileObj) {
			message.error('No file selected');
			return '';
		}

		try {
			const fileFormat = file.originFileObj.type.split('/')[1];
			const fileName = file.originFileObj.name;
			if (!fileFormat || !fileName) {
				message.error('Invalid file format');
				return;
			}

			// getting signed URL from backend server
			const { data: url } = await apiService('/upload')();
			// Uploading file to S3
			await axios.put(url, file, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			const imageUrl = url.split('?')[0];
			// Adding uploaded image to the database
			await apiService<object, { payload: object }>('/upload/add')({
				data: { payload: { url: imageUrl, format: fileFormat, name: fileName } },
			});
			return imageUrl;
		} catch (err) {
			message.error('Error in uploading file');
		}
	};

	const onModalCancel = () => {
		setModalOpen(false);
	};

	return {
		state: { fileScope, modalOpen, selectedFiles },
		onModalCancel,
		handleImageChange,
		openModal,
		handleFileScopeChange,
		onSelectUploadedFile,
		handleSelectedFiles,
	};
};

export default useUploadSelector;
