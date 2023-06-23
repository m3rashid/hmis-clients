import { Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { IConfig } from '../../recoil/config';

interface IProps {
	onlyLogo?: boolean;
	config: IConfig;
}

const Brand: React.FC<IProps> = ({ config, onlyLogo = false }) => {
	const title = config.app.name;
	const subTitle = `v${config.app.version}`;
	const logo = '/images/logo.png';

	return (
		<div className="flex gap-x-2">
			<Link to="/" className="all-center">
				<Image
					preview={false}
					height={40}
					width={40}
					src={logo}
					alt={`${title} Logo`}
					className="mr-2 cursor-pointer"
				/>
			</Link>
			{!onlyLogo && (
				<div className="flex flex-col justify-center">
					<Typography.Text strong>{title}</Typography.Text>
					{subTitle && <Typography.Text type="secondary">{subTitle}</Typography.Text>}
				</div>
			)}
		</div>
	);
};

export default Brand;
