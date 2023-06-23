import { message } from 'antd';
import { useCallback,  } from 'react';
import { useNavigate } from 'react-router-dom';

import { instance } from '../api/network';
import apiService from '..//api/service';
import { useRecoilState } from 'recoil';
import { authAtom, authDefaultState } from '../recoil/auth';

export interface Login {
	email: string;
	password: string;
}

const useAuth = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useRecoilState(authAtom);
	const revalidateApi = apiService('/auth/revalidate');
	const loginUser = apiService<any, Login>('/auth/login');

	const loginFailed = () => message.error({ content: 'login Failed', key: 'auth/login' });

	const login = async (values: Login, after: () => void) => {
		try {
			const { data } = await loginUser({ data: values });
			const { accessToken, refreshToken, user } = data;
			setAuth((prev) => ({ ...prev, isLoggedIn: true, token: accessToken, user }));
			instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
			localStorage.setItem('refreshToken', refreshToken);
			message.success({ content: 'login Successful', key: 'auth/login' });
			after();
		} catch (error) {
			loginFailed();
		}
	};

	const logout = useCallback(() => {
		localStorage.removeItem('refreshToken');
		instance.defaults.headers.common['Authorization'] = '';
		navigate('/');
		// socket.disconnect();
		setAuth(authDefaultState);
	}, [navigate, setAuth]);

	const revalidateJWT = async ({ msg = false }: { msg?: boolean }) => {
		try {
			const token = localStorage.getItem('refreshToken');
			if (!token) throw new Error('No token found');
			const { data } = await revalidateApi({ headers: { Authorization: `Bearer ${token}` } });
			const { accessToken, refreshToken, user } = data;
			setAuth((prev) => ({ ...prev, isLoggedIn: true, token: `Bearer ${accessToken}`, user }));
			localStorage.setItem('refreshToken', refreshToken);
			instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
			// @ts-ignore
			// socket.io.opts.auth.token = accessToken;
			// socket.disconnect().connect();
			if (msg) message.success({ content: 'login Successful', key: 'auth/login' });
		} catch (err) {
			console.log(err);
			setAuth({
				user: null,
				error: null,
				token: null,
				loading: false,
				isLoggedIn: false,
			});
		}
	};

	return {
		auth,
		login,
		logout,
		loginFailed,
		revalidateJWT,
	};
};

export default useAuth;
