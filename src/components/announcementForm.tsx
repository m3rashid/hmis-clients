import { Form, FormInstance, Input } from 'antd';

interface IProps {
	editData: any;
	form: FormInstance<any>;
	isEdit: boolean;
}

const NoticeForm = ({ form, isEdit, editData }: IProps) => {
	return (
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
};

export default NoticeForm;
