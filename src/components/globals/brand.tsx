import { Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetConfig } from '../../recoil/config';
import { useGetUi } from '../../recoil/ui';

const Brand: React.FC = () => {
	const config = useGetConfig();
	const ui = useGetUi()

	return (
		<div className="flex gap-x-2">
			<Link to="/" className="all-center">
				<Image
					preview={false}
					height={50}
					width={50}
					src="/images/logo.png"
					alt={`${config.app.name} Logo`}
					className="mr-2 cursor-pointer"
				/>
			</Link>
			{!ui.isMobile && (
				<div className="flex flex-col justify-center">
					<Typography.Text strong>{config.app.name}</Typography.Text>
					<Typography.Text type="secondary">{`v${config.app.version}`}</Typography.Text>
				</div>
			)}
		</div>
	);
};

export default Brand;
