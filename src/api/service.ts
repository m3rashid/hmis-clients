import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export type ServiceHelper<Res, ReqData> = (
	config?: AxiosRequestConfig<ReqData>
) => Promise<AxiosResponse<Res>>

const apiService =
	<Res = any, ReqData = undefined>(
		method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
		url: string
	): ServiceHelper<Res, ReqData> =>
	config => {
		return axios<Res>({
			url,
			method,
			baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
			...(config || {}),
		})
	}

export default apiService
