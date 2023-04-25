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
	app: {
		name: string
		version: string
		fullName: string
		theme: 'light' | 'dark'
	}
	appColors: {
		primary: string
		primaryHoverLight: string
		primaryHoverDark: string
	}
	colors: {
		success: string
		warning: string
		danger: string
		info: string
	}
	developers: Array<Developers>
}

export type IConfigExposedState = Pick<IConfig, 'colors' | 'appColors' | 'app'>

export const configDefaultState: IConfig = {
	app: {
		name: 'HMIS',
		version: '1.0.0',
		fullName: 'Health Management and Informatics System',
		theme: 'light',
	},
	appColors: {
		primary: '#00BDC1',
		primaryHoverLight: '#E6FFFB',
		primaryHoverDark: '#2a7b9744',
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
