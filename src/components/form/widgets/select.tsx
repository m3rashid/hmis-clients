import { Select } from 'antd'

const CustomMultiSelect = (props: any) => {
	return <Select mode='multiple' allowClear options={props.schema.items?.enum}></Select>
}

export default CustomMultiSelect
