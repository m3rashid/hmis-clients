import { Form, FormItemProps, Select, SelectProps } from 'antd'
import React from 'react'

type IProps = FormItemProps & {
	selectProps?: SelectProps<any>
}

const DoctorSelector: React.FC<IProps> = (props) => {
	// const onSearch = (value: string) => {}

	return (
		<Form.Item name="doctor" {...props}>
			<Select
				showSearch
				placeholder="Select Doctor"
				optionFilterProp="children"
				{...props.selectProps}
			/>
		</Form.Item>
	);
}

export default DoctorSelector
