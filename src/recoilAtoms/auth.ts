import { atom } from 'recoil'

// TODO: implement the new permission management
export const supportedUserRoles = [
	'DOCTOR',
	'ADMIN',
	'RECEPTIONIST',
	'PHARMACIST',
	'INVENTORY_MANAGER',
	'CO_ADMIN',
	'OTHER',
] as const

export type IUser = {
	id: string | number
	name: string
	email: string
	profile: any
	permissions: Array<string>
	userRole: (typeof supportedUserRoles)[number]
}

export type IAuth = {
	isLoggedIn: boolean
	user: IUser | null
	token: string | null
	loading: boolean
	error: any | null
}

export const authDefaultState: IAuth = {
	isLoggedIn: false,
	user: null,
	token: null,
	loading: false,
	error: null,
}

const authAtom = atom<IAuth>({
	key: 'auth',
	default: authDefaultState,
})

export default authAtom
