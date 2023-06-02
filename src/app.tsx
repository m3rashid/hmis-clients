import 'antd/dist/reset.css'
import './index.css'
import { Typography } from 'antd'
import { Fragment, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loading from 'src/components/atoms/loading'
import ErrorBoundary from 'src/components/globals/errorBoundary'
import routes from 'src/components/globals/routes'
// import { authContext } from 'src/context/auth'
import ErrorPage from 'src/pages/error'

const FullPageLoading = () => (
	<Loading classNames='min-h-[80vh] flex-col' spinProps={{ size: 'large' }}>
		<Typography.Text style={{ marginTop: 30, fontSize: 18 }}>App is Loading</Typography.Text>
	</Loading>
)

const App = () => {
	// const [auth, setAuth] = useContext(authContext)

	return (
		<Suspense fallback={<FullPageLoading />}>
			<ErrorBoundary>
				<Routes>
					{routes.map(route => (
						// TODO: handle permissions here
						<Fragment key={route.link}>
							{!route.nestedLinks ? (
								route.Component && (
									<Route path={route.link} loader={FullPageLoading} element={<route.Component />} />
								)
							) : (
								<Fragment>
									<Route
										path={route.link}
										loader={FullPageLoading}
										element={<Navigate to={route.nestedLinks[0].link} />}
									/>
									{route.nestedLinks.map(nestedRoute => (
										<Route
											loader={FullPageLoading}
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
			</ErrorBoundary>
		</Suspense>
	)
}

export default App