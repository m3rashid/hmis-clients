import { serverRootUrl } from 'api/network'
import authAtom from 'atoms/auth'
import axios, { AxiosRequestConfig } from 'axios'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

interface IUseApi {
	endpoint: string
	method?: AxiosRequestConfig['method']
	headers?: AxiosRequestConfig['headers']
	body?: any
	onSuccess?: (data?: any) => void
	onError?: (err?: any) => void
	onFinal?: () => void
	abortTime?: number
	isApi?: boolean
}

const useApi = ({
	endpoint = '/',
	method = 'GET',
	headers = {},
	body = {},
	onSuccess = () => {},
	onError = () => {},
	onFinal = () => {},
	abortTime = 5000, // 5 seconds
	isApi = true,
}: IUseApi) => {
	const [loading, setLoading] = useState(false)
	const [auth, setAuth] = useRecoilState(authAtom)

	const abortSignal = () => {
		const abortController = new AbortController()
		setTimeout(() => abortController.abort(), abortTime)
		return abortController.signal
	}

	const handleApiCall = async () => {
		try {
			setLoading(true)

			// TODO: setup network call with abort controller
			const res = await axios({
				method,
				url: `${serverRootUrl}${isApi ? '/api' : ''}${endpoint}`,
				signal: abortSignal(),
				headers: {
					'Content-Type': 'application/json',
					Authorization: auth.token,
					...headers,
				},
				...(method !== 'GET' && method !== 'get' && method !== 'HEAD' && method !== 'head'
					? { body: JSON.stringify(body) }
					: {}),
			})
			onSuccess(res.data)
		} catch (err: any) {
			console.log(
				`Error in API ${method} - ${endpoint} :: `,
				err.message || 'Internal Server Error'
			)
			onError(err)
		} finally {
			setLoading(false)
			onFinal()
		}
	}

	return {
		apiCall: handleApiCall,
		loading,
	}
}

export default useApi
