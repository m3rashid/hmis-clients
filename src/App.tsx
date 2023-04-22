import 'antd/dist/reset.css'
import 'index.css'
import useApi from 'hooks/useApi'
import { useSetRecoilState } from 'recoil'
import configAtom from 'recoilAtoms/config'
import routes from 'components/globals/routes'
import Loading from 'components/atoms/loading'
import { Route, Routes } from 'react-router-dom'
import React, { Fragment, useCallback, useEffect } from 'react'

const App = () => {
	const setConfig = useSetRecoilState(configAtom)

	const { apiCall, loading: configLoading } = useApi({
		endpoint: '/config',
		onSuccess: data => setConfig(data),
		onError: console.log,
	})

	const getAppConfig = useCallback(apiCall, [])

	// TODO: check user logged in

	useEffect(() => {
		getAppConfig()
	}, [getAppConfig])

	if (configLoading) return <Loading />

	return (
		<Routes>
			{routes.map(route => (
				// TODO: handle permissions here
				<Fragment key={route.link}>
					<Route path={route.link} element={<route.Component {...route.props} />} />;
					{route.nestedLinks?.map(nestedRoute => (
						<Route
							key={nestedRoute.link}
							path={nestedRoute.link}
							element={<nestedRoute.Component />}
						/>
					))}
				</Fragment>
			))}
		</Routes>
	)
}

export default App
