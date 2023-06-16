import { message } from 'antd';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import apiService, { socket } from "src/api/service"
import { authContext, authDefaultState } from 'src/context/auth';

export interface Login {
	email: string;
	password: string;
}

const useAuth = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useContext(authContext);
	const revalidateApi = apiService('POST', '/auth/revalidate');
	const loginUser = apiService<any, Login>('POST', '/auth/login');

	const loginFailed = () => message.error({ content: 'login Failed', key: 'auth/login' });

	const login = async (values: Login, after: () => void) => {
		try {
			const { data } = await loginUser({ data: values });
			const { accessToken, refreshToken, user } = data;
			setAuth((prev) => ({ ...prev, isLoggedIn: true, token: accessToken, user }));
			localStorage.setItem('refresh_token', refreshToken);
			message.success({ content: 'login Successful', key: 'auth/login' });
			after();
		} catch (error) {
			loginFailed();
		}
	};

	const logout = useCallback(() => {
		localStorage.removeItem('refresh_token');
		navigate('/');
		socket.disconnect();
		setAuth(authDefaultState);
	}, [navigate, setAuth]);

	const revalidateJWT = async () => {
		const token = localStorage.getItem('refresh_token');
		if (!token) throw new Error('No token found');
		const { data } = await revalidateApi({ headers: { Authorization: `Bearer ${token}` } });
		const { accessToken, refreshToken, user } = data;
		setAuth((prev) => ({ ...prev, isLoggedIn: true, token: accessToken, user }));
		localStorage.setItem('refresh_token', refreshToken);
		// @ts-ignore
		socket.io.opts.auth.token = accessToken;
		socket.disconnect().connect();
		message.success({ content: 'login Successful', key: 'auth/login' });
	};

	const revalidate = useCallback(async () => {
		setTimeout(() => {
			revalidateJWT().catch((err: any) => {
				console.log(err);
				setAuth({
					user: null,
					error: null,
					token: null,
					loading: false,
					isLoggedIn: false,
				});
			});
		}, 5000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setAuth]);

	return {
		auth,
		login,
		logout,
		revalidate,
		loginFailed,
	};
};

export default useAuth;
