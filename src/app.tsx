import 'antd/dist/reset.css';
import './index.css';
import { Typography } from 'antd';
import { Fragment, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Loading from './components/atoms/loading';
import ErrorBoundary from './components/globals/errorBoundary';
import routes from './components/globals/routes';
import ErrorPage from './pages/error';

import useAuth from './hooks/auth';

const FullPageLoading = () => (
	<Loading classNames="min-h-[80vh] flex-col" spinProps={{ size: 'large' }}>
		<Typography.Text style={{ marginTop: 30, fontSize: 18 }}>App is Loading</Typography.Text>
	</Loading>
);

const App = () => {
	const { revalidateJWT } = useAuth();

	useEffect(() => {
		revalidateJWT({ msg: true });
		const timeout = setTimeout(() => {
			revalidateJWT({});
		}, 1000 * 60); // 1 minute
		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Suspense fallback={<FullPageLoading />}>
			<ErrorBoundary>
				<Routes>
					{routes.map((route) => (
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
									{route.nestedLinks.map((nestedRoute) => (
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
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</ErrorBoundary>
		</Suspense>
	);
};

export default App;
