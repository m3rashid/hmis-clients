import React, { Fragment, useState } from 'react';
import { Button, Dropdown, Form, Input, Modal } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import useAuth from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

interface IProps {
	isMobile: boolean;
}

const AuthActions: React.FC<IProps> = ({ isMobile }) => {
	const [authModalVisible, setAuthModalVisible] = useState(false);
	const closeModal = () => setAuthModalVisible(false);
	const openModal = () => setAuthModalVisible(true);
	const { auth, login, logout } = useAuth();
	const [form] = Form.useForm()
	const navigate = useNavigate();

	const handleLogin = async () => {
		await form.validateFields();
		const values = form.getFieldsValue();
		await login(values, closeModal);
	};

	if (!auth.isLoggedIn) {
		return (
			<Fragment>
				<Button
					type="primary"
					className="all-center rounded-full"
					icon={<UserOutlined />}
					onClick={openModal}
				>
					{!isMobile ? 'Login' : ''}
				</Button>
				<Modal title="Login" open={authModalVisible} footer={null}>
					<Form form={form} onFinish={handleLogin}>
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
							<Button type="primary" onClick={handleLogin}>
								Login
							</Button>
						</div>
					</Form>
				</Modal>
			</Fragment>
		);
	}

	return (
		<Dropdown
			overlayStyle={{ borderRadius: 0 }}
			menu={{
				items: [
					...(auth.isLoggedIn && auth.user
						? [
								{ key: 'name', label: auth.user?.name ?? '', disabled: true },
								{ key: 'email', label: auth.user.email ?? '', disabled: true },
						  ]
						: []),
					{ type: 'divider' },
					{
						key: 'profile',
						icon: <UserOutlined />,
						label: 'Profile',
						onClick: () => navigate('/me/profile'),
					},
					{
						key: 'settings',
						icon: <SettingOutlined />,
						label: 'Personal Settings',
						onClick: () => navigate('/me/settings'),
					},
					{ type: 'divider' },
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
				icon={<UserOutlined className="mx-1 sm:mx-0" />}
			>
				{(!isMobile && auth.user?.name) ?? ''}
			</Button>
		</Dropdown>
	);
};

export default AuthActions;
