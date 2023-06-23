import React, { FC } from 'react';
import { Grammarly, GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';

import { widgets } from './map';
import FormRenderer from './renderer';

type FormBuilder = FC<any> & {
	register: (widgetName: string, widget: FC, fieldTransformer?: (params?: any) => any) => void;
	useForceUpdate: () => () => void;
};

const FormBuilder: FormBuilder = (props) => {
	return (
		<Grammarly clientId="client_SESyko14Xy52FytaqacGc8">
			<FormRenderer meta={props.meta} />
		</Grammarly>
	);
};

FormBuilder.register = (
	widgetName,
	Widget,
	fieldTransformer
) => {
	widgets[widgetName] = {
		widget: (props) => (
			<GrammarlyEditorPlugin>
				<Widget {...props} />
			</GrammarlyEditorPlugin>
		),
		fieldTransformer: fieldTransformer || undefined,
	};
};

FormBuilder.useForceUpdate = () => {
	const [, update] = React.useState<Record<any, any>>();
	const forceUpdate = React.useCallback(() => update({}), []);
	return forceUpdate;
};

export default FormBuilder;
