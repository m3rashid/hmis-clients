import { RegistryFieldsType, RegistryWidgetsType, UiSchema } from '@rjsf/utils';

import CustomColorWidget from './color';
import CustomMultiSelect from './select';
import CustomTextArea from './textArea';

export const overrideWidgetsSchema: UiSchema = {
	'ui:TextareaWidget': 'CustomTextArea',
	'ui:SelectWidget': 'CustomMultiSelect',
};

export const customWidgets: RegistryWidgetsType = {
	ColorWidget: CustomColorWidget,
};

export const customFields: RegistryFieldsType = {
	ArrayField: CustomMultiSelect,
	DescriptionField: CustomTextArea,
};
