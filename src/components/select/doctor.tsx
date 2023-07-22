import { MODELS } from '@hmis/gatekeeper';
import { Form, FormItemProps, Select, SelectProps } from 'antd';
import React, { useCallback } from 'react';
import debounce from 'lodash.debounce';
import apiService from '../../api/service';

type IProps = FormItemProps & {
	selectProps?: SelectProps<any>;
};

const DoctorSelector: React.FC<IProps> = (props) => {
	const [doctors, setDoctors] = React.useState<MODELS.IUser[]>([]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getDoctors = useCallback(
		debounce(async (text) => {
			if (!text) return setDoctors([]);
			const res = await apiService<{ docs: MODELS.IUser[] }, { query: object; options?: object }>(
				'/user/user/search'
			)({
				data: {
					query: { deleted: false, isDoctor: true, origin: 'INTERNAL', $text: { $search: text } },
					options: { page: 1, limit: 10 }
				},
			});

			console.log(res.data.docs);
		}, 500),
		[]
	);

	console.log(doctors)

	return (
		<Form.Item name="doctor" label="Select Doctor" {...props}>
			<Select
				showSearch
				placeholder="Select Doctor"
				optionFilterProp="children"
				onSearch={(text) => getDoctors(text)}
				{...props.selectProps}
			/>
		</Form.Item>
	);
};

export default DoctorSelector;
