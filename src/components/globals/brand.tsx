import { useQuery } from '@tanstack/react-query'
import { Image, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import apiService from 'api/service'
import { configDefaultState } from 'context/config'

interface IProps {
	onlyLogo?: boolean
}

const Brand: React.FC<IProps> = ({ onlyLogo = false }) => {
	const { data: configResponse } = useQuery({
		queryKey: ['config'],
		queryFn: () => apiService('GET', '/config')(),
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	})
	const config = configResponse?.data || configDefaultState
	const title = config.app.name
	const subTitle = `v${config.app.version}`
	const logo = '/images/logo.png'

	return (
		<div className='flex gap-x-2'>
			<Link to='/' className='all-center'>
				<Image
					preview={false}
					height={40}
					width={40}
					src={logo}
					alt={`${title} Logo`}
					className='mr-2 cursor-pointer'
				/>
			</Link>
			{!onlyLogo && (
				<div className='flex flex-col justify-center'>
					<Typography.Text strong>{title}</Typography.Text>
					{subTitle && <Typography.Text type='secondary'>{subTitle}</Typography.Text>}
				</div>
			)}
		</div>
	)
}

export default Brand
