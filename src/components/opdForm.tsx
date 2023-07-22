import dayjs from 'dayjs';
import { ENUMS } from '@hmis/gatekeeper';
import { IFormProps } from './table/types';
import { DatePicker, Form, Select } from 'antd';
import { toSentenceCase } from '../helpers/strings';

const OpdForm = ({ form, isEdit, editData }: IFormProps) => {
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
		>
			<Form.Item
				name="appointment"
				label="Appointment"
				rules={[{ required: true, message: 'Appointment is required' }]}
			>
				<Select />
			</Form.Item>

			<Form.Item
				name="prescription"
				label="Prescription"
				rules={[{ required: true, message: 'Prescription is required' }]}
			>
				<Select />
			</Form.Item>

			<Form.Item
				name="status"
				label="Status"
				rules={[{ required: true, message: 'Status is required' }]}
			>
				<Select
					options={ENUMS.OPD_STATUS.map((t) => ({ value: t, label: toSentenceCase(t) }))}
					defaultActiveFirstOption
					defaultValue={ENUMS.OPD_STATUS[0]}
				/>
			</Form.Item>

			<Form.Item name="payment" label="Payment">
				{/* Payment Selector */}
				<Select placeholder="Choose Payment" />
			</Form.Item>

			<Form.Item
				name="date"
				label="Date"
				rules={[{ required: true, message: 'Date is required' }]}
			>
				<DatePicker className="w-full" format="DD-MM-YYYY" defaultValue={dayjs()} />
			</Form.Item>

			<Form.Item name="nextDate" label="Next Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" />
			</Form.Item>
		</Form>
	);
};

export default OpdForm;
