import { atom } from 'recoil'

export type IUi = {
	sidebarCollapsed: boolean
	isMobile: boolean
}

export const defaultUiState: IUi = {
	sidebarCollapsed: false,
	isMobile: window.innerWidth < 500,
}

const uiAtom = atom<IUi>({
	key: 'ui',
	default: defaultUiState,
})

export default uiAtom
