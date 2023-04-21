import { Image, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
	inline?: boolean
	onlyLogo?: boolean
	url?: string
}

const Brand: React.FC<IProps> = ({ inline = false, onlyLogo = false }) => {
	const title = 'HMIS'
	const subTitle = ''
	const logo = ''

	if (!inline) {
		return (
			<div className='text-center my-4'>
				{logo && (
					<Link to='/'>
						<Image
							preview={false}
							height={64}
							width={64}
							src={logo}
							alt={`${title} Logo`}
							className='mr-2 cursor-pointer'
						/>
					</Link>
				)}

				{!onlyLogo && (
					<>
						<Typography.Title level={3} style={{ margin: 0 }}>
							{title}
						</Typography.Title>

						{subTitle && (
							<Typography.Title level={5} type='secondary' style={{ margin: 0 }}>
								{subTitle}
							</Typography.Title>
						)}
					</>
				)}
			</div>
		)
	}

	return (
		<div className='flex gap-x-2'>
			{logo && (
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
			)}
			{!onlyLogo && (
				<div>
					<Typography.Text strong>{title}</Typography.Text>
					{subTitle && (
						<>
							<br />
							<Typography.Text type='secondary'>{subTitle}</Typography.Text>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default Brand
