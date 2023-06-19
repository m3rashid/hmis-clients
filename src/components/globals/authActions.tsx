import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Modal } from 'antd';
import React, { useState } from 'react';

import Form from '../../components/form';
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
		await login(values.formData, closeModal);
	};

	if (!auth.isLoggedIn) {
		return (
			<>
				<Button type="primary" className="all-center" icon={<UserOutlined />} onClick={openModal}>
					{!isMobile ? 'Login' : ''}
				</Button>
				<Modal
					title="Login"
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
						submitText="Login"
						onCancel={closeModal}
					/>
				</Modal>
			</>
		);
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
