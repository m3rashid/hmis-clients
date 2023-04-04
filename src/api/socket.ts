// implement socket from browser websocket api

import { serverRootUrl } from 'api/network'

export const formatMessage = () => {}

export const setupWebsocket = () => {
	const socket = new WebSocket('ws://' + serverRootUrl.split('//')[1] + '/ws')
	socket.onopen = () => {
		console.log('connected')
	}
	socket.onmessage = event => {
		console.log(event.data)
	}
	socket.onclose = () => {
		console.log('disconnected')
	}
	socket.onerror = error => {
		console.log('Error: ' + error)
	}

	return socket
}
