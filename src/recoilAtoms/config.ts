import { atom } from 'recoil'

export type KvPairs = { [key: string]: string }
type Developers = {
	name: string
	github: string
	linkedIn: string
	website: string
	image: string
}

export type IConfig = {
	appName: string
	appFullName: string
	appColors: {
		primary: string
		primaryHover: string
		secondary: string
	}
	colors: {
		success: string
		warning: string
		danger: string
		info: string
	}
	appVersion: string
	appLogo?: string
	developers: Array<Developers>
}

export type IConfigExposedState = Pick<IConfig, 'colors' | 'appColors'>

export const configDefaultState: IConfig = {
	appName: 'HMIS',
	appVersion: '1.0.0',
	appFullName: 'Health Management and Informatics System',
	appColors: {
		primary: '#00BDC1',
		primaryHover: '#E6FFFB',
		secondary: '#484C56',
	},
	colors: {
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9',
	},
	developers: [],
}

const configAtom = atom<IConfig>({
	key: 'config',
	default: configDefaultState,
})

export default configAtom
