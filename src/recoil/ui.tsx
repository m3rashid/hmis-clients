import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export interface ITableOptions {
	page: number;
	limit: number;
}

export type IUi = {
	sidebarCollapsed: boolean;
	isMobile: boolean;
	table: ITableOptions;
};

const tableDefaultOptions = window.localStorage.getItem('tableOptions');

export const defaultUiState: IUi = {
	sidebarCollapsed: false,
	isMobile: true,
	table: tableDefaultOptions ? JSON.parse(tableDefaultOptions) : { limit: 15, page: 1 },
};

export const uiAtom = atom<IUi>({
	key: 'ui',
	default: defaultUiState,
});

export const useUi = () => useRecoilState(uiAtom);
export const useGetUi = () => useRecoilValue(uiAtom);
export const useSetUi = () => useSetRecoilState(uiAtom);
