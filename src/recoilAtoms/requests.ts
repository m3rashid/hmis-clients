import { atom } from 'recoil'

export type INetworkQueue = Array<{
	status: 'processing' | 'failed' | 'success' | 'untouched'
}>

const defaultRequestQueueState: INetworkQueue = []

const networkQueueAtom = atom<INetworkQueue>({
	key: 'network',
	default: defaultRequestQueueState,
})

export default networkQueueAtom
