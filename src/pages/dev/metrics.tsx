import ErrorPage from 'pages/404'
import useApi from 'hooks/useApi'
import { serverRootUrl } from 'api/network'
import React, { useEffect, useRef } from 'react'

const Metrics = () => {
	const metricsUrl = serverRootUrl + '/metrics'
	const metricsRef = useRef<any>(false)
	const { apiCall: checkMetricsEndpoint } = useApi({
		endpoint: '/metrics',
		onSuccess: () => (metricsRef.current = true),
		onError: () => (metricsRef.current = false),
	})

	useEffect(() => {
		const interval = setInterval(() => {
			checkMetricsEndpoint()
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div ref={metricsRef} className='w-full h-[99%]'>
			{metricsRef.current ? (
				<iframe src={metricsUrl} className='outline-none w-full h-[99%] border-0' />
			) : (
				<ErrorPage message='Could not get Server metrics' />
			)}
		</div>
	)
}

export default Metrics
