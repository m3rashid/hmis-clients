import { Button, DatePicker, Form, Input, InputNumber, message } from 'antd';
import apiService from '../api/service';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { Validator, inventoryValidator } from '@hmis/gatekeeper';

interface IProps {
	editData?: any;
	closeModal: () => void;
}

const ConsumableForm = ({ closeModal, editData }: IProps) => {
	const [form] = Form.useForm();
	const isEdit = Object.keys(editData || {}).length > 0;
	const addConsumable = apiService('/consumable/add');
	const updateConsumable = apiService('/consumable/edit');

	const mutation = useMutation({
		mutationFn: (values: any) => {
			return isEdit ? updateConsumable({ data: values }) : addConsumable({ data: values });
		},
	});

	const modalClose = () => {
		form.resetFields();
		closeModal();
	};

	const handleCreateUpdateConsumable = async () => {
		form.validateFields();
		const values = { ...form.getFieldsValue(), ...(isEdit ? { _id: editData._id } : {}) };
		const errors = Validator.onlyValidate(
			values,
			isEdit ? inventoryValidator.updateConsumableSchema : inventoryValidator.createConsumableSchema
		);

		if (errors.length > 0) {
			Validator.errorShow(errors).map((t) => message.error(t));
			return;
		}

		mutation.mutate(values);
		form.resetFields();
		modalClose();
	};

	const ActionButtons = (
		<div className="flex gap-2 h-12 items-center justify-end">
			<Button onClick={() => modalClose()}>Cancel</Button>
			<Button type="primary" onClick={handleCreateUpdateConsumable}>
				Confirm Consumable
			</Button>
		</div>
	);

	const FormContainer = (
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

	return {
		ActionButtons,
		FormContainer,
	};
};

export default ConsumableForm;
