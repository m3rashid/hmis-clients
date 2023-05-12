import React from 'react'
import Lottie from 'react-lottie'
import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import * as errorAnimation from 'animations/error-404.json'

type IProps = {
	message?: string
	buttonLabel?: string
}

const ErrorPage: React.FC<IProps> = ({
	buttonLabel = 'Return to Home',
	message = 'Page Not found',
}) => {
	const navigate = useNavigate()

	return (
		<div
			className='flex justify-center items-center flex-col gap-10 bg-white'
			style={{ minHeight: 'calc(100vh - 130px)' }}
		>
			<Lottie options={{ animationData: errorAnimation }} height={600} />
			<div className='flex flex-col items-center'>
				<Typography.Title level={3}>{message}</Typography.Title>
				<Button onClick={() => navigate('/')}>{buttonLabel}</Button>
			</div>
		</div>
	)
}

export default ErrorPage
