import React, { useEffect, useRef } from 'react'
import { serverRootUrl } from 'api/network'
import useApi from 'hooks/useApi'
import ErrorPage from 'pages/404'

interface IProps {}

const Metrics: React.FC<IProps> = () => {
	const metricsUrl = serverRootUrl + '/metrics'
	const metricsRef = useRef(false)
	const { apiCall: checkMetricsEndpoint } = useApi({
		endpoint: '/metrics',
		onSuccess: () => (metricsRef.current = true),
		onError: () => (metricsRef.current = false),
		isApi: false,
	})

	useEffect(() => {
		checkMetricsEndpoint()
	}, [])

	return (
		// @ts-ignore
		<div ref={metricsRef} className='w-full h-[99%]'>
			{metricsRef.current ? (
				<iframe src={metricsUrl} className='outline-none w-full h-[99%] border-0' />
			) : (
				<ErrorPage message='Could not connect to the server' />
			)}
		</div>
	)
}

export default Metrics
