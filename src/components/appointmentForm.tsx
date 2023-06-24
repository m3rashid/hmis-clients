import { DatePicker, Form, Select } from 'antd';
import dayjs from 'dayjs';
import {ENUMS} from "@hmis/gatekeeper"
import { toSentenceCase } from '../helpers/strings';
import { IFormProps } from './form/useTableForm';

const AppointmentForm = ({ form, isEdit, editData }: IFormProps) => {
	return (
		<Form
			form={form}
			layout="vertical"
			{...(isEdit
				? {
						initialValues: {
							...editData,
							...(editData.date ? { date: dayjs(editData.date) } : {}),
						},
				  }
				: {})}
		>
			{/* TODO: Doctor Selector */}

			{/* Registered Patient Selector */}

			<Form.Item name="status" label="Status">
				<Select
					options={ENUMS.APPOINTMENT_STATUS.map((t) => ({ value: t, label: toSentenceCase(t) }))}
				/>
			</Form.Item>

			<Form.Item name="payment" label="Payment">
				{/* Payment Selector */}
				<Select />
			</Form.Item>

			<Form.Item name="type" label="Appointment Type">
				<Select
					options={ENUMS.APPOINTMENT_TYPE.map((t) => ({ value: t, label: toSentenceCase(t) }))}
				/>
			</Form.Item>

			<Form.Item name="date" label="Date">
				<DatePicker />
			</Form.Item>
		</Form>
	);
};

export default AppointmentForm;
