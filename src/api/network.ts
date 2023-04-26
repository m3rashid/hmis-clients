import { invoke } from '@tauri-apps/api'

export const isDesktopApp = !!(window as any).__TAURI__

export let serverRootUrl = process.env.REACT_APP_BACKEND_BASE_URL

if (isDesktopApp) {
	invoke('get_environment_variable', { name: 'SERVER_URL' })
		.then(hostIp => {
			if (hostIp) serverRootUrl = hostIp as string
		})
		.catch(console.log)
}
