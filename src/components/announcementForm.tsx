import { Form, Input } from 'antd';
import { IFormProps } from './table/types';

const NoticeForm = ({ form, isEdit, editData }: IFormProps) => {
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
