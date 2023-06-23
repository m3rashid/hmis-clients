import { atom } from 'recoil';

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
