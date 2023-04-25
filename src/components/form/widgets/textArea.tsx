import React from 'react'
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { Input } from 'antd'

const CustomTextArea = () => {
	return (
		// eslint-disable-next-line no-undef
		<GrammarlyEditorPlugin clientId={process.env.REACT_APP_GRAMMARLY_CLIENT_ID}>
			<Input.TextArea />
		</GrammarlyEditorPlugin>
	)
}

export default CustomTextArea
