import 'antd/dist/reset.css'
import 'index.css'
import React, { Fragment } from 'react'
import routes from 'components/globals/routes'
import { Route, Routes } from 'react-router-dom'

const App = () => {
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
