import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { Image, Typography } from 'antd'
import { configContext } from 'context/config'

interface IProps {
	onlyLogo?: boolean
}

const Brand: React.FC<IProps> = ({ onlyLogo = false }) => {
	const [config] = useContext(configContext)

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
