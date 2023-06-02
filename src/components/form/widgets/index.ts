import { RegistryFieldsType, RegistryWidgetsType, UiSchema } from '@rjsf/utils'

import CustomColorWidget from 'src/components/form/widgets/color'
import CustomMultiSelect from 'src/components/form/widgets/select'
import CustomTextArea from 'src/components/form/widgets/textArea'

export const overrideWidgetsSchema: UiSchema = {
	'ui:TextareaWidget': 'CustomTextArea',
	'ui:SelectWidget': 'CustomMultiSelect',
}

export const customWidgets: RegistryWidgetsType = {
	ColorWidget: CustomColorWidget,
}

export const customFields: RegistryFieldsType = {
	ArrayField: CustomMultiSelect,
	DescriptionField: CustomTextArea,
}
