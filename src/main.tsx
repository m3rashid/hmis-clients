import 'src/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import AppLayout from './components/globals/layout';
import { AuthContextProvider } from './context/auth';
import { UiContextProvider } from './context/ui';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
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
);
