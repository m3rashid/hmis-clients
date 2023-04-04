import { invoke } from '@tauri-apps/api'

export const isDesktopApp = !!(window as any).__TAURI__

export let serverRootUrl = 'http://localhost:4000'

if (isDesktopApp) {
	invoke('get_environment_variable', { name: 'SERVER_URL' })
		.then(hostIp => {
			if (hostIp) serverRootUrl = hostIp as string
		})
		.catch(console.log)
}
