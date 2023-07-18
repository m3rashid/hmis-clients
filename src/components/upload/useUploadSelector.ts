import axios from 'axios';
import { message } from 'antd';
import { useState } from 'react';
import { RcFile } from 'antd/es/upload';
import apiService from '../../api/service';

export type FileScope = 'all' | 'mine';
export interface IProps {
	activeKey?: FileScope | null;
	handleSelectedFile?: (url: string, format: string) => Promise<void>;
	editImage?: boolean;
}

const useUploadSelector = (props: IProps) => {
	const getSignedUrlApi = apiService('/upload');
	const addSignedUrlApi = apiService<object, { payload: { url: string; format: string } }>(
		'/upload/add'
	);

	const [modalOpen, setModalOpen] = useState(false);
	const [fileScope, setFileScope] = useState<FileScope | null>(props.activeKey || 'mine');
	const openModal = () => setModalOpen(true);

	const handleFileScopeChange = (scope: string) => {
		if (scope === 'all' || scope === 'mine') {
			setFileScope(scope);
			return;
		}
		setFileScope(null);
	};

	const onSelectUploadedFile = async (url: string, format: string) => {
		console.log({ url, format });
		if (props.handleSelectedFile) {
			await props.handleSelectedFile(url, format);
		}
	};

	const uploadFile = async (file: File) => {
		try {
			const fileFormat = file.type.split('/')[1];
			if (!fileFormat) {
				message.error('Invalid file format');
				return;
			}

			const { data: url } = await getSignedUrlApi();
			await axios.put(url, file, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			const imageUrl = url.split('?')[0];
			await addSignedUrlApi({ data: { payload: { url: imageUrl, format: fileFormat } } });
			return imageUrl;
		} catch (err) {
			message.error('Error in uploading file');
		}
	};

	const handleImageChange = async (file: RcFile) => {
		if (!file) {
			message.error('No file selected');
			return;
		}

		try {
			const url = await uploadFile(file);
			return url;
		} catch (err: any) {
			console.log(err);
			message.error('Error uploading image');
		}
	};

	const onModalCancel = () => {
		setModalOpen(false);
	};

	return {
		state: { fileScope, modalOpen },
		onModalCancel,
		handleImageChange,
		openModal,
		handleFileScopeChange,
		onSelectUploadedFile,
	};
};

export default useUploadSelector;
