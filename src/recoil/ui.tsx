import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export type IUi = {
	sidebarCollapsed: boolean;
	isMobile: boolean;
};

export const defaultUiState: IUi = {
	sidebarCollapsed: false,
	isMobile: true,
};

export const uiAtom = atom<IUi>({
	key: 'ui',
	default: defaultUiState,
});

export const useUi = () => useRecoilState(uiAtom);
export const useGetUi = () => useRecoilValue(uiAtom);
export const useSetUi = () => useSetRecoilState(uiAtom);
