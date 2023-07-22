import { MODELS } from '@hmis/gatekeeper';
import { Modal } from 'antd';
import React from 'react';

interface IProps {
	file: MODELS.IUpload | null;
	setFilePreview: React.Dispatch<React.SetStateAction<MODELS.IUpload | null>>;
}

const ShowFilePreview: React.FC<IProps> = ({ file, setFilePreview }) => {
	return (
		<Modal open={!!file} onCancel={() => setFilePreview(null)}>
			<div>Preview</div>
			{JSON.stringify(file, null, 2)}
		</Modal>
	);
};

export default ShowFilePreview;
