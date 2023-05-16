import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'

export type IUi = {
	sidebarCollapsed: boolean
	isMobile: boolean
}

export const defaultUiState: IUi = {
	sidebarCollapsed: false,
	isMobile: true,
}

export const uiContext = createContext<[ui: IUi, setUi: Dispatch<SetStateAction<IUi>>]>([
	defaultUiState,
	() => {},
])

export const UiContextProvider = ({ children }: PropsWithChildren) => {
	const [ui, setUi] = useState(defaultUiState)

	return <uiContext.Provider value={[ui, setUi]}>{children}</uiContext.Provider>
}
