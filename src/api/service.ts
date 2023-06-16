import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import io from 'socket.io-client';

import { serverRootUrl } from 'src/api/network';

export let socket = io(serverRootUrl, {
	transports: ['websocket'],
	autoConnect: false,
	auth: { token: localStorage.getItem('refresh_token') },
});

window.setTimeout(() => {
	socket = io(serverRootUrl, {
		autoConnect: false,
		auth: { token: localStorage.getItem('refresh_token') },
	});
}, 2000);

export type ServiceHelper<Res, ReqData> = (
	config?: AxiosRequestConfig<ReqData>
) => Promise<AxiosResponse<Res>>;

const apiService =
	<Res = any, ReqData = undefined>(
		method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
		url: string
	): ServiceHelper<Res, ReqData> =>
	(config) => {
		return axios<Res>({
			url,
			method,
			baseURL: serverRootUrl,
			...(config || {}),
		});
	};

export default apiService;
