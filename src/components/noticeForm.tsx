import { Button, Form, Input, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import apiService from '../api/service';
import { Validator, notificationValidator } from '@hmis/gatekeeper';

interface IProps {
	editData?: any;
	closeModal: () => void;
}

const NoticeForm = ({ closeModal, editData }: IProps) => {
	const [form] = Form.useForm();
	const isEdit = Object.keys(editData || {}).length > 0;
	const addNotification = apiService('/notification/add');
	const updateNotification = apiService('/notification/update');

	const mutation = useMutation({
		mutationFn: (values: any) => {
			return isEdit ? updateNotification({ data: values }) : addNotification({ data: values });
		},
	});

	const handleCreateUpdateNotification = () => {
		form.validateFields();
		const values = { ...form.getFieldsValue(), ...(isEdit ? { _id: editData._id } : {}) };
		const errors = Validator.onlyValidate(
			values,
			isEdit
				? notificationValidator.updateNotificationSchema
				: notificationValidator.createNotificationSchema
		);

		if (errors.length > 0) {
			Validator.errorShow(errors).map((t) => message.error(t));
			return;
		}

		mutation.mutate(values);
		form.resetFields();
		closeModal();
	};

	const ActionButtons = (
		<div className="flex gap-2 h-12 items-center justify-end">
			<Button onClick={() => closeModal()}>Cancel</Button>
			<Button type="primary" onClick={handleCreateUpdateNotification}>
				Confirm Notice
			</Button>
		</div>
	);

	const FormContainer = (
		<Form form={form} layout="vertical" {...(isEdit ? { initialValues: editData } : {})}>
			<Form.Item
				rules={[{ required: true, message: 'Title is required' }]}
				name="title"
				label="Title"
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="description"
				label="Description"
				rules={[{ required: true, message: 'Description is required' }]}
			>
				<Input.TextArea rows={10} />
			</Form.Item>
		</Form>
	);

	return {
		ActionButtons,
		FormContainer,
	};
};

export default NoticeForm;
