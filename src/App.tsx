import 'antd/dist/reset.css'
import 'index.css'
import { Typography } from 'antd'
import ErrorPage from 'pages/404'
import { authContext } from 'context/auth'
import routes from 'components/globals/routes'
import Loading from 'components/atoms/loading'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Fragment, Suspense, useContext } from 'react'

const App = () => {
	const [auth, setAuth] = useContext(authContext)

	return (
		<Suspense
			fallback={
				<Loading classNames='min-h-[80vh] flex-col' spinProps={{ size: 'large' }}>
					<Typography.Text style={{ marginTop: 30, fontSize: 18 }}>App is Loading</Typography.Text>
				</Loading>
			}
		>
			<Routes>
				{routes.map(route => (
					// TODO: handle permissions here
					<Fragment key={route.link}>
						{!route.nestedLinks ? (
							route.Component && <Route path={route.link} element={<route.Component />} />
						) : (
							<Fragment>
								<Route path={route.link} element={<Navigate to={route.nestedLinks[0].link} />} />
								{route.nestedLinks.map(nestedRoute => (
									<Route
										key={nestedRoute.link}
										path={nestedRoute.link}
										element={<nestedRoute.Component />}
									/>
								))}
							</Fragment>
						)}
					</Fragment>
				))}
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Suspense>
	)
}

export default App
