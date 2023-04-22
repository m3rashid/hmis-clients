import React from 'react'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import { Image, Typography } from 'antd'
import configAtom from 'recoilAtoms/config'

interface IProps {
	onlyLogo?: boolean
}

const Brand: React.FC<IProps> = ({ onlyLogo = false }) => {
	const config = useRecoilValue(configAtom)

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
