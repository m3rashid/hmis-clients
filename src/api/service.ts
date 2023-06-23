import { AxiosRequestConfig, AxiosResponse } from 'axios';
// import io from 'socket.io-client';

import {
	instance,
	// serverRootUrl
} from '../api/network';

// export let socket = io(serverRootUrl, {
// 	transports: ['websocket'],
// 	autoConnect: false,
// 	auth: { token: localStorage.getItem('refreshToken') },
// });

// window.setTimeout(() => {
// 	socket = io(serverRootUrl, {
// 		autoConnect: false,
// 		auth: { token: localStorage.getItem('refreshToken') },
// 	});
// }, 2000);

export type ServiceHelper<Res, ReqData> = (
	config?: AxiosRequestConfig<ReqData>
) => Promise<AxiosResponse<Res>>;

const apiService =
	<Res = any, ReqData = undefined>(
		url: string,
		method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
	): ServiceHelper<Res, ReqData> =>
	(config) => {
		return instance<Res>({
			url,
			method,
			...(config || {}),
		});
	};

export default apiService;
