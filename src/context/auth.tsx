import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'

export type IUser = any

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

export const authContext = createContext<[auth: IAuth, setAuth: Dispatch<SetStateAction<IAuth>>]>([
	authDefaultState,
	() => {},
])

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [auth, setAuth] = useState(authDefaultState)

	return <authContext.Provider value={[auth, setAuth]}>{children}</authContext.Provider>
}
