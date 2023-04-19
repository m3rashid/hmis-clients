import { atom } from 'recoil'

type KvPairs = { [key: string]: string }
type Developers = {
	name: string
	github: string
	linkedIn: string
	website: string
	image: string
}

export type IConfig = {
	// appThemeColor: string
	// appDarkColor: string
	// appLightForeground: string
	// appLightBackground: string
	// appSidebarColor: string
	// appHeaderColor: string
	appName: string
	appFullName: string
	colors: {
		primary: string
		secondary: string
		lightFg: string
		lightBg: string
		darkFg: string
		darkBg: string
		success: string
		warning: string
		danger: string
		info: string
	}
	appVersion: string
	appLogo?: string
	sidebarStringMap: KvPairs
	otherStringMap: KvPairs
	developers: Array<Developers>
}

export type IConfigExposedState = Pick<IConfig, 'colors' | 'sidebarStringMap' | 'otherStringMap'>

export const configDefaultState: IConfig = {
	appName: 'HMIS',
	appVersion: '1.0.0',
	appFullName: 'Health Management and Informatics System',
	colors: {
		primary: '#00BDC1',
		secondary: '#484C56',
		lightFg: '#F9F9F9',
		lightBg: '#F1F1F1',
		darkFg: '#484C56',
		darkBg: '#484C56',
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9',
	},
	sidebarStringMap: {
		home: 'Home',
		about: 'About',
		contact: 'Contact',
		learn: 'Learn',
		'learn-home': 'Home',
		'learn-modules': 'Modules',
	},
	otherStringMap: {
		login: 'Login',
		register: 'Register',
		logout: 'Logout',
	},
	developers: [],
}

const configAtom = atom<IConfig>({
	key: 'config',
	default: configDefaultState,
})

export default configAtom
