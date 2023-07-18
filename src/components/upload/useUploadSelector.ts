import axios from 'axios';
import { message } from 'antd';
import { useState } from 'react';
import apiService from '../../api/service';

const useUploadSelector = () => {
	const getSignedUrlApi = apiService('/upload');

	const [modalOpen, setModalOpen] = useState(false);
	// const [myUploads, setMyUploads] = useState<MODELS.IUpload[]>([]);
	// const [allUploads, setAllUploads] = useState<MODELS.IUpload[]>([]);

	const uploadFile = async (file: File) => {
		try {
			const { data: url } = await getSignedUrlApi();
			await axios({
				method: 'put',
				url: url,
				headers: { 'Content-Type': 'multipart/form-data' },
				data: file,
			});
			const imageUrl = url.split('?')[0];
			console.log('imageUrl: ' + imageUrl);
			return imageUrl;
		} catch (err) {
			message.error('Error in uploading file');
		}
	};

	 const handleImageChange = async (options: any) => {
			if (!options || !options.file) {
				return;
			}

			try {
				// const formData = new FormData();
				// formData.append('file', options.file);
				// const { data } = await instance({
				// 	method: 'POST',
				// 	data: formData,
				// 	url: '/upload',
				// 	headers: {
				// 		'Content-Type': 'multipart/form-data',
				// 		Authorization: `Bearer ${localStorage.getItem('token')}`,
				// 	},
				// });
				// setImageUrl(data.url);
				// if (handleImageUrl) handleImageUrl(data.url);
				const url = await uploadFile(options.file)
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
		state: { modalOpen },
		onModalCancel,
		uploadFile,
		handleImageChange,
	};
};

export default useUploadSelector;
