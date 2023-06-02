import 'src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from 'src/app'
import AppLayout from 'src/components/globals/layout'
import { AuthContextProvider } from 'src/context/auth'
import { UiContextProvider } from 'src/context/ui'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
