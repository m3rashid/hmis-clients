import { notification } from 'antd'
import { authContext } from 'context/auth'
import { useNetwork } from '@mantine/hooks'
import { serverRootUrl } from 'api/network'
import { useContext, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

/**
 * TODO: Use the Browser IndexedDB to persist failed network requests
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
 */

interface IUseApi {
	endpoint: string
	method?: AxiosRequestConfig['method']
	headers?: AxiosRequestConfig['headers']
	body?: any
	onSuccess?: (data?: any) => void
	onError?: (err?: any) => void
	onFinal?: () => void
	abortTime?: number
}

const useApi = ({
	endpoint = '/',
	method = 'GET',
	headers = {},
	body = {},
	onSuccess = () => {},
	onError = () => {},
	onFinal = () => {},
	abortTime = 10_000, // 10 seconds
}: IUseApi) => {
	const [loading, setLoading] = useState(false)
	const [auth] = useContext(authContext)
	const network = useNetwork()

	const abortSignal = () => {
		const abortController = new AbortController()
		setTimeout(() => {
			abortController.abort()
			//
		}, abortTime)
		return abortController.signal
	}

	const handleApiCall = async () => {
		// console.log({ network })
		if (!network.online) {
			// TODO: push the request in queue

			notification.info({
				message: 'Network Error',
				description:
					'Your Local network seems not working, Do not panic. We have received your request. It will be done once your network comes online again',
			})
			return
		}

		try {
			setLoading(true)

			const res = await axios({
				method,
				url: `${serverRootUrl}${endpoint}`,
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
