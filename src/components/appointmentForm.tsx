import dayjs from 'dayjs';
import { ENUMS } from '@hmis/gatekeeper';
import { DatePicker, Form, Select } from 'antd';
import { toSentenceCase } from '../helpers/strings';
import { IFormProps } from './form/useTableForm';
import DoctorSelector from './select/doctor';
import PatientSelector from './select/patient';

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
			<DoctorSelector />

			<PatientSelector  />

			<Form.Item name="status" label="Status">
				<Select
					options={ENUMS.APPOINTMENT_STATUS.map((t) => ({ value: t, label: toSentenceCase(t) }))}
					defaultActiveFirstOption
					defaultValue={ENUMS.APPOINTMENT_STATUS[0]}
				/>
			</Form.Item>

			<Form.Item name="type" label="Appointment Type">
				<Select
					options={ENUMS.APPOINTMENT_TYPE.map((t) => ({ value: t, label: toSentenceCase(t) }))}
					defaultActiveFirstOption
					defaultValue={ENUMS.APPOINTMENT_TYPE[0]}
				/>
			</Form.Item>

			<Form.Item name="date" label="Date">
				<DatePicker className="w-full" format="DD-MM-YYYY" defaultValue={dayjs()} />
			</Form.Item>

			<Form.Item name="payment" label="Payment">
				{/* Payment Selector */}
				<Select placeholder="Choose Payment" />
			</Form.Item>
		</Form>
	);
};

export default AppointmentForm;
