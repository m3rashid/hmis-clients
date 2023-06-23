import { atom } from 'recoil';

export type IUser = any;

export type IAuth = {
	isLoggedIn: boolean;
	user: IUser | null;
	token: string | null;
	loading: boolean;
	error: any | null;
};

export const authDefaultState: IAuth = {
	isLoggedIn: false,
	user: null,
	token: null,
	loading: false,
	error: null,
};

export const authAtom = atom<IAuth>({
	key: 'auth',
	default: authDefaultState,
});
