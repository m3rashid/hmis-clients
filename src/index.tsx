import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from 'components/globals/layout'
import { ConfigContextProvider } from 'context/config'
import { UiContextProvider } from 'context/ui'
import { AuthContextProvider } from 'context/auth'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ConfigContextProvider>
				<UiContextProvider>
					<AuthContextProvider>
						<AppLayout>
							<App />
						</AppLayout>
					</AuthContextProvider>
				</UiContextProvider>
			</ConfigContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
