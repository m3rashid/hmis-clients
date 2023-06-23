import { Button, DatePicker, Form, Input, InputNumber, message } from 'antd';
import apiService from '../api/service';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { Validator, inventoryValidator } from '@hmis/gatekeeper';

interface IProps {
	editData?: any;
	closeModal: () => void;
}

const NonConsumableForm = ({ closeModal, editData }: IProps) => {
	const [form] = Form.useForm();
	const isEdit = Object.keys(editData || {}).length > 0;
	const addNonConsumable = apiService('/non-consumable/add');
	const updateNonConsumable = apiService('/non-consumable/edit');

	const mutation = useMutation({
		mutationFn: (values: any) => {
			return isEdit ? updateNonConsumable({ data: values }) : addNonConsumable({ data: values });
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
			isEdit
				? inventoryValidator.updateNonConsumableSchema
				: inventoryValidator.createNonConsumableSchema
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
				Confirm Non Consumable
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

	return {
		ActionButtons,
		FormContainer,
	};
};

export default NonConsumableForm;
