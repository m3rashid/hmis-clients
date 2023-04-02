import { Spin, SpinProps } from 'antd'
import React from 'react'

type IProps = SpinProps

const Loading: React.FC<IProps> = props => (
	<div className='flex items-center justify-center'>
		<Spin {...props} />
	</div>
)

export default Loading
