import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import apiService from '../api/service';

export type IConfig = {
	app: {
		name: string;
		version: string;
		fullName: string;
	};
	theme: {
		mode: 'light' | 'dark';
		primaryColor: string;
		success: string;
		warning: string;
		danger: string;
		info: string;
	};
};

export const configDefaultState: IConfig = {
	app: {
		name: 'HMIS',
		version: '1.0.0',
		fullName: 'Hospital Management and Informatics System',
	},
	theme: {
		mode: 'light',
		primaryColor: '#6366f1',
		success: '#22C55E',
		warning: '#F59E0B',
		danger: '#F43F5E',
		info: '#0EA5E9',
	},
};

export const configAtom = atom<IConfig>({
	key: 'config',
	default: configDefaultState,
});

export const useConfig = () => useRecoilState(configAtom);
export const useGetConfig = () => useRecoilValue(configAtom);
export const useSetConfig = () => useSetRecoilState(configAtom);

export const useInitConfig = () => {
	const configApi = apiService('/config', 'GET');
	const setConfig = useSetConfig();

	const getConfig = async () => {
		const { data } = await configApi();
		setConfig(data);
	};

	return getConfig;
};
