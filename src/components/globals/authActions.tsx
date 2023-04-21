import Form from 'components/atoms/form'
import configAtom from 'recoilAtoms/config'
import { useNavigate } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import authAtom, { authDefaultState } from 'recoilAtoms/auth'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, message, Modal } from 'antd'

interface IProps {
	width: number
}

const AuthActions: React.FC<IProps> = ({ width }) => {
	const [auth, setAuth] = useRecoilState(authAtom)
	const config = useRecoilValue(configAtom)
	const [authModalVisible, setAuthModalVisible] = useState(false)
	const closeModal = () => setAuthModalVisible(false)
	const openModal = () => setAuthModalVisible(true)

	const navigate = useNavigate()

	const loginFailed = () => {
		message.error({
			content: `${config.otherStringMap.login || 'login'} Failed`,
			key: 'auth/login',
		})
	}

	const handleLogin = async (values: any) => {
		try {
			console.log(values)
			message.success({
				content: `${config.otherStringMap.login || 'login'} Successful`,
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
					{width > 576 ? 'Login' : ''}
				</Button>
				<Modal
					title={config.otherStringMap.login || 'Login'}
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
						submitText={config.otherStringMap.login || 'Login'}
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
				className={`all-center ${width < 576 ? 'rounded-full' : 'gap-2'}`}
				icon={
					<Avatar
						size='small'
						src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${auth.user?.name}`}
						className={width < 576 ? 'mx-1' : ''}
					/>
				}
			>
				{(width >= 576 && auth.user?.name) ?? ''}
			</Button>
		</Dropdown>
	)
}

export default AuthActions
