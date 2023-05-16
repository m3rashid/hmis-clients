import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from 'App'
import AppLayout from 'components/globals/layout'
import { AuthContextProvider } from 'context/auth'
import { UiContextProvider } from 'context/ui'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<UiContextProvider>
					<AuthContextProvider>
						<AppLayout>
							<App />
						</AppLayout>
					</AuthContextProvider>
				</UiContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
