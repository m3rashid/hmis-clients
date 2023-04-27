import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { UiContextProvider } from 'context/ui'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from 'components/globals/layout'
import { AuthContextProvider } from 'context/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigContextProvider } from 'context/config'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ConfigContextProvider>
					<UiContextProvider>
						<AuthContextProvider>
							<AppLayout>
								<App />
							</AppLayout>
						</AuthContextProvider>
					</UiContextProvider>
				</ConfigContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
