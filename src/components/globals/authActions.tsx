import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

import useAuth from '../../hooks/auth';

interface IProps {
	isMobile: boolean;
}

const AuthActions: React.FC<IProps> = ({ isMobile }) => {
	const [authModalVisible, setAuthModalVisible] = useState(false);
	const closeModal = () => setAuthModalVisible(false);
	const openModal = () => setAuthModalVisible(true);
	const { auth, login, logout } = useAuth();

	const handleLogin = async (values: any) => {
		await login(values, closeModal);
	};

	if (!auth.isLoggedIn) {
		return (
			<>
				<Button type="primary" className="all-center" icon={<UserOutlined />} onClick={openModal}>
					{!isMobile ? 'Login' : ''}
				</Button>
				<Modal title="Login" open={authModalVisible} footer={null}>
					<Form onFinish={handleLogin}>
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{ required: true, message: 'Email is required' },
								{ type: 'email', message: 'Must be a valid email' },
							]}
						>
							<Input placeholder="Enter your email" />
						</Form.Item>

						<Form.Item
							name="password"
							label="Password"
							rules={[{ required: true, message: 'Email is required' }]}
						>
							<Input.Password placeholder="Enter your password" />
						</Form.Item>

						<div className="flex gap-2 items-center justify-end">
							<Button onClick={closeModal}>Cancel</Button>
							<Button type="primary" htmlType='submit' onClick={handleLogin}>
								Login
							</Button>
						</div>
					</Form>
				</Modal>
			</>
		);
	}

	return (
		<Dropdown
			overlayStyle={{ minWidth: 200 }}
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
						onClick: logout,
					},
				],
			}}
		>
			<Button
				type="text"
				className={`all-center rounded-full sm:gap-2`}
				icon={
					<Avatar
						size="small"
						src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${auth.user?.name}`}
						className="mx-1 sm:mx-0"
					/>
				}
			>
				{(!isMobile && auth.user?.name) ?? ''}
			</Button>
		</Dropdown>
	);
};

export default AuthActions;
