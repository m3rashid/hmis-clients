import React, { useEffect, useRef } from 'react'
import { AutoComplete, Input, Modal, Tooltip } from 'antd'
import { CloseCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'

const renderTitle = (title: string) => (
	<span>
		{title}
		<a
			style={{ float: 'right' }}
			href='https://www.google.com/search?q=antd'
			target='_blank'
			rel='noopener noreferrer'
		>
			more
		</a>
	</span>
)

const renderItem = (title: string, count: number) => ({
	value: title,
	label: (
		<div className='flex justify-between'>
			{title}
			<span>
				<UserOutlined />
				{count}
			</span>
		</div>
	),
})

const options = [
	{
		label: renderTitle('Libraries'),
		options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
	},
	{
		label: renderTitle('Solutions'),
		options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
	},
	{
		label: renderTitle('Articles'),
		options: [renderItem('AntDesign design language', 100000)],
	},
]

interface IProps {
	isOpen: boolean
	close: () => void
}

const ActionSearchModal: React.FC<IProps> = ({ close, isOpen }) => {
	const ref = useRef<any>()

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => ref.current && ref.current.focus(), 10)
		}
	}, [isOpen])

	return (
		<Modal
			footer={null}
			destroyOnClose
			closable={false}
			open={isOpen}
			centered={false}
			onCancel={close}
			focusTriggerAfterClose={false}
			bodyStyle={{ padding: 0 }}
		>
			<AutoComplete
				size='large'
				autoFocus
				options={options}
				style={{ width: '100%' }}
				dropdownMatchSelectWidth={500}
				popupClassName='certain-category-search-dropdown'
			>
				<Input
					ref={ref}
					size='large'
					autoFocus
					placeholder='Search...'
					className='border-none shadow-none text-[18px]'
					prefix={<SearchOutlined className='text-[24px] mr-3' />}
					suffix={
						<Tooltip title='Press Esc for closing modal'>
							<CloseCircleOutlined className='text-[20px] text-gray-400' onClick={close} />
						</Tooltip>
					}
				/>
			</AutoComplete>
		</Modal>
	)
}

export default ActionSearchModal
