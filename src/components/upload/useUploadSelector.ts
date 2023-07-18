import axios from 'axios';
import { message } from 'antd';
import { useState } from 'react';
import apiService from '../../api/service';

export type FileScope = 'all' | 'mine';

const useUploadSelector = () => {
	const getSignedUrlApi = apiService('/upload');
	const addSignedUrlApi = apiService<object, { payload: { url: string } }>('/upload/add');

	const [modalOpen, setModalOpen] = useState(false);
	const [fileScope, setFileScope] = useState<FileScope>('mine');
	const openModal = () => setModalOpen(true);

	const handleFileScopeChange = (scope: string) => {
		setFileScope(scope as FileScope);
	};

	const uploadFile = async (file: File) => {
		try {
			const { data: url } = await getSignedUrlApi();
			await axios.put(url, file, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			const imageUrl = url.split('?')[0];
			console.log('imageUrl: ' + imageUrl, url);

			await addSignedUrlApi({ data: { payload: { url: imageUrl } } });
			return imageUrl;
		} catch (err) {
			message.error('Error in uploading file');
		}
	};

	const handleImageChange = async (options: any) => {
		if (!options || !options.file) {
			message.error('No file selected');
			return;
		}

		try {
			const url = await uploadFile(options.file);
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
		uploadFile,
		handleImageChange,
		openModal,

		handleFileScopeChange,
	};
};

export default useUploadSelector;
