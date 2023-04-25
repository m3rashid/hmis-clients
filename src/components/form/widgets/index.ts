import { RegistryFieldsType, RegistryWidgetsType, UiSchema } from '@rjsf/utils'
import CustomTextArea from 'components/form/widgets/textArea'
import CustomMultiSelect from 'components/form/widgets/select'
import CustomColorWidget from 'components/form/widgets/color'

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
