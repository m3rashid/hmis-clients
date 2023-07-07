import { Form, FormItemProps, Select, SelectProps } from 'antd';
import React, { useState } from 'react';
import apiService from '../../api/service';

type IProps = FormItemProps & {
	selectProps?: SelectProps<any>;
};

interface IPatient {
	value: string;
	name: string;
	email: string;
	profileId: string;
}

const PatientSelector: React.FC<IProps> = (props) => {
	const [patients, setPatients] = useState<IPatient[]>([]);

	const getData = async (text: string) => {
		const searchPatient = apiService<IPatient[], { text: string }>('/search/patient', 'POST');
		const { data } = await searchPatient({ data: { text: text || '' } });
		setPatients(data);
	};
	getData("hello")

	return (
		<Form.Item name="patient" label="Select Patient" {...props}>
			<Select
				showSearch
				placeholder="Select Patient"
				optionFilterProp="children"
				options={patients.map((t) => ({ label: `${t.name} - ${t.email}`, value: t.value }))}
				{...props.selectProps}
			/>
		</Form.Item>
	);
};

export default PatientSelector;
