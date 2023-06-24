import { Button, Image, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type IProps = {
	buttonLabel?: string;
	type?: '401' | '404';
};

const ErrorPage: React.FC<IProps> = ({ buttonLabel = 'Return to Home', type = '404' }) => {
	const navigate = useNavigate();

	return (
		<div
			className="flex justify-center items-center flex-col gap-10"
			style={{ minHeight: 'calc(100vh - 130px)' }}
		>
			<Image preview={false} src="/images/404.png" />
			<div className="flex flex-col gap-2 items-center">
				<Typography.Title level={3}>
					{type === '404' ? 'Page Not Found' : 'Access Denied'}
				</Typography.Title>
				<Button onClick={() => navigate('/')}>{buttonLabel}</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
