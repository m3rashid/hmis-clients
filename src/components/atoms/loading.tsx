import { Spin, SpinProps } from 'antd'
import React from 'react'

type IProps = {
	spinProps?: SpinProps
	classNames?: string
} & React.PropsWithChildren

const Loading: React.FC<IProps> = props => (
	<div className={`flex items-center justify-center ${props.classNames}`}>
		<Spin {...props.spinProps} />
		{props.children}
	</div>
)

export default Loading
