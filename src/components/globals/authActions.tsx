import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Modal, message } from 'antd'
import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'src/components/form'
import { authContext, authDefaultState } from 'src/context/auth'

interface IProps {
	isMobile: boolean
}

const AuthActions: React.FC<IProps> = ({ isMobile }) => {
	const [auth, setAuth] = useContext(authContext)
	const [authModalVisible, setAuthModalVisible] = useState(false)
	const closeModal = () => setAuthModalVisible(false)
	const openModal = () => setAuthModalVisible(true)

	const navigate = useNavigate()

	const loginFailed = () => {
		message.error({
			content: 'login Failed',
			key: 'auth/login',
		})
	}

	const handleLogin = async (values: any) => {
		try {
			console.log(values)
			message.success({
				content: 'login Successful',
				key: 'auth/login',
			})
			setAuthModalVisible(false)
		} catch (error) {
			loginFailed()
		}
	}

	const handleLogout = useCallback(() => {
		localStorage.removeItem('refresh_token')
		navigate('/')

		// socket.disconnect();
		setAuth(authDefaultState)
	}, [navigate, setAuth])

	if (!auth.isLoggedIn) {
		return (
			<>
				<Button type='primary' className='all-center' icon={<UserOutlined />} onClick={openModal}>
					{!isMobile ? 'Login' : ''}
				</Button>
				<Modal
					title='Login'
					footer={null}
					open={authModalVisible}
					onOk={handleLogin}
					onCancel={closeModal}
				>
					<Form
						formSchema={{
							type: 'object',
							required: ['email', 'password'],
							properties: {
								email: { type: 'string', title: 'Email', format: 'email' },
								password: { type: 'string', format: 'password', title: 'Password' },
							},
						}}
						onFinishFormValues={handleLogin}
						submitText='Login'
						onCancel={closeModal}
					/>
				</Modal>
			</>
		)
	}

	return (
		<Dropdown
			overlayStyle={{ minWidth: 150 }}
			menu={{
				items: [
					{
						key: 'name',
						label: auth.user?.name ?? '',
						disabled: true,
					},
					{
						key: 'logout',
						icon: <LogoutOutlined />,
						label: 'Logout',
						danger: true,
						onClick: handleLogout,
					},
				],
			}}
		>
			<Button
				type='text'
				className={`all-center rounded-full sm:gap-2`}
				icon={
					<Avatar
						size='small'
						src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${auth.user?.name}`}
						className='mx-1 sm:mx-0'
					/>
				}
			>
				{(!isMobile && auth.user?.name) ?? ''}
			</Button>
		</Dropdown>
	)
}

export default AuthActions
