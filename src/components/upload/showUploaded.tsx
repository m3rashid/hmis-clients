import React from 'react';

interface IProps {
	scope: 'all' | 'mine';
}

const ShowUploaded: React.FC<IProps> = ({ scope }) => {
	// todo: selected
	//

	return (
		<>
			<div>Uploads: {scope}</div>
		</>
	);
};

export default ShowUploaded;
