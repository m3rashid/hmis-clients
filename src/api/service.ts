import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { serverRootUrl } from 'src/api/network'

export type ServiceHelper<Res, ReqData> = (
	config?: AxiosRequestConfig<ReqData>
) => Promise<AxiosResponse<Res>>

const apiService =
	<Res = any, ReqData = undefined>(
		method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
		url: string
	): ServiceHelper<Res, ReqData> =>
	config => {
		console.log({ config, url, method, serverRootUrl })
		return axios<Res>({
			url,
			method,
			baseURL: serverRootUrl,
			...(config || {}),
		})
	}

export default apiService
