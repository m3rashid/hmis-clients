import { Form, FormItemProps, Select, SelectProps } from 'antd';
import React, { Fragment, useState } from 'react'
export interface AppointmentSelectorProps {
	doctorFormProps?: FormItemProps
	doctorSelectProps?: SelectProps<any>
	timeFormProps?: FormItemProps
	timeSelectProps?: SelectProps<any>
}

const AppointmentSelector: React.FC<AppointmentSelectorProps> = (props) => {
	const [] = useState()

	return (
		<Fragment>
			<Form.Item name="appointment" {...props.doctorFormProps}>
				<Select
					showSearch
					placeholder="Select Appointment"
					optionFilterProp="children"
					{...props.doctorSelectProps}
				/>
			</Form.Item>

			<Form.Item name="doctorTime" {...props.timeFormProps}>
				<Select
					showSearch
					placeholder="Select Appointment"
					optionFilterProp="children"
					{...props.timeSelectProps}
				/>
			</Form.Item>
		</Fragment>
	);
};

export default AppointmentSelector
