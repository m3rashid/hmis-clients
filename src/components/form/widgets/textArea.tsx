import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import ReactQuill from 'react-quill'

const CustomTextArea = () => {
	return (
		// eslint-disable-next-line no-undef
		<GrammarlyEditorPlugin clientId={import.meta.env.VITE_GRAMMARLY_CLIENT_ID}>
			<ReactQuill theme='snow' />
		</GrammarlyEditorPlugin>
	)
}

export default CustomTextArea
