import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import apiService from "../api/service";

type Developers = {
	name: string;
	github: string;
	linkedIn: string;
	website: string;
	image: string;
};

export type IConfig = {
	app: {
		name: string;
		version: string;
		fullName: string;
		theme: 'light' | 'dark';
	};
	appColors: {
		primary: string;
		primaryHoverLight: string;
		primaryHoverDark: string;
	};
	colors: {
		success: string;
		warning: string;
		danger: string;
		info: string;
	};
	developers: Array<Developers>;
};

export type IConfigExposedState = Pick<IConfig, 'colors' | 'appColors' | 'app'>;

export const configDefaultState: IConfig = {
	app: {
		name: 'HMIS',
		version: '1.0.0',
		fullName: 'Hospital Management and Informatics System',
		theme: 'dark',
	},
	appColors: {
		primary: '#6366f1',
		primaryHoverLight: '#818cf8',
		primaryHoverDark: '#312e81',
	},
	colors: {
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9',
	},
	developers: [],
};

export const configAtom = atom<IConfig>({
	key: 'config',
	default: configDefaultState,
});

export const useConfig = () => useRecoilState(configAtom)
export const useGetConfig = () => useRecoilValue(configAtom)
export const useSetConfig = () => useSetRecoilState(configAtom)


export const useInitConfig = () => {
	const configApi = apiService('/config', 'GET');
	const setConfig = useSetConfig()

	const getConfig = async () => {
		const { data } = await configApi();
		setConfig(data)
	};

	return getConfig
}


