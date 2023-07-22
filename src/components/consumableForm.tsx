import dayjs from 'dayjs';
import { IFormProps } from './table/types';
import { DatePicker, Form, Input, InputNumber } from 'antd';

const ConsumableForm = ({ form, isEdit, editData }: IFormProps) => {
	return (
		<Form
			form={form}
			layout="vertical"
			{...(isEdit
				? {
						initialValues: {
							...editData,
							...(editData.expiryDate ? { expiryDate: dayjs(editData.expiryDate) } : {}),
							...(editData.lastOrderDate ? { lastOrderDate: dayjs(editData.lastOrderDate) } : {}),
							...(editData.nextOrderDate ? { nextOrderDate: dayjs(editData.nextOrderDate) } : {}),
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

			<Form.Item
				rules={[{ required: true, message: 'Quantity Per Unit is required' }]}
				name="quantityPerUnit"
				label="Quantity Per Unit"
			>
				<InputNumber className="w-full" />
			</Form.Item>

			<Form.Item name="batchNumber" label="Batch Number">
				<Input />
			</Form.Item>

			<Form.Item name="manufacturer" label="Manufacturer">
				<Input />
			</Form.Item>

			<Form.Item name="expiryDate" label="Expiry Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" />
			</Form.Item>

			<Form.Item name="lastOrderDate" label="Last Order Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" />
			</Form.Item>

			<Form.Item name="nextOrderDate" label="Next Order Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" />
			</Form.Item>
		</Form>
	);
};

export default ConsumableForm;
