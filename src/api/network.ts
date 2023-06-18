import { invoke } from '@tauri-apps/api'
import axios from 'axios'

export const isDesktopApp = !!(window as any).__TAURI__

export let serverRootUrl = import.meta.env.VITE_BACKEND_BASE_URL

if (isDesktopApp) {
	invoke('get_environment_variable', { name: 'SERVER_URL' })
		.then(hostIp => {
			if (hostIp) serverRootUrl = hostIp as string
		})
		.catch(console.log)
}

export const instance = axios.create({
	baseURL: serverRootUrl,
});
