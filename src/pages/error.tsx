import { Button, Typography } from 'antd';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

const importJson = (name: string) => {
	return import(`../animations/${name}.json`).then((res) => res.default);
};
type IProps = {
	buttonLabel?: string;
	type?: '401' | '404';
};

const ErrorPage: React.FC<IProps> = ({ buttonLabel = 'Return to Home', type = '404' }) => {
	const navigate = useNavigate();
	const [data, setData] = React.useState<any>(null);

	useEffect(() => {
		if (type === '401') importJson('lock').then(setData);
		else importJson('error-404').then(setData);
	}, []);

	return (
		<div
			className="flex justify-center items-center flex-col gap-10 bg-white"
			style={{ minHeight: 'calc(100vh - 130px)' }}
		>
			<Lottie options={{ animationData: data }} height={type === '404' ? 600 : 300} />
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
