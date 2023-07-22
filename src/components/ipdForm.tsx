import dayjs from 'dayjs';
import { Form } from 'antd';
import { IFormProps } from './table/types';

const IpdForm = ({ form, isEdit, editData }: IFormProps) => {
	return (
		<Form
			form={form}
			layout="vertical"
			{...(isEdit
				? {
						initialValues: {
							...editData,
							...(editData.date ? { date: dayjs(editData.date) } : {}),
							...(editData.nextDate ? { nextDate: dayjs(editData.nextDate) } : {}),
						},
				  }
				: {})}
		></Form>
	)
}

export default IpdForm
