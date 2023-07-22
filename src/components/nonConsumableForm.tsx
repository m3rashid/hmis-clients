import dayjs from 'dayjs';
import { IFormProps } from './table/types';
import { DatePicker, Form, Input, InputNumber } from 'antd';

const NonConsumableForm = ({ form, isEdit, editData }: IFormProps) => {
	return (
		<Form
			form={form}
			layout="vertical"
			{...(isEdit
				? {
						initialValues: {
							...editData,
							...(editData.lastServicingDate
								? { lastServicingDate: dayjs(editData.lastServicingDate) }
								: {}),
							...(editData.nextServicingDate
								? { nextServicingDate: dayjs(editData.nextServicingDate) }
								: {}),
						},
				  }
				: {})}
		>
			<Form.Item rules={[{ required: true, message: 'Name is required' }]} name="name" label="Name">
				<Input />
			</Form.Item>

			<Form.Item
				rules={[{ required: true, message: 'Quantity Left is required' }]}
				name="quantityLeft"
				label="Quantity"
			>
				<InputNumber className="w-full" />
			</Form.Item>

			<Form.Item name="manufacturer" label="Manufacturer">
				<Input />
			</Form.Item>

			<Form.Item name="lastServicingDate" label="Last Servicing Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" />
			</Form.Item>

			<Form.Item name="nextServicingDate" label="Next Servicing Date Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" />
			</Form.Item>
		</Form>
	);
};

export default NonConsumableForm;
