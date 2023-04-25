/// <reference types="react-scripts" />

declare namespace NodeJS {
	interface ProcessEnv {
		//types of envs
		NODE_ENV: 'development' | 'production' | 'test'
		PUBLIC_URL: string
		REACT_APP_GRAMMARLY_CLIENT_ID: string
		REACT_APP_BACKEND_BASE_URL: string
	}
}
