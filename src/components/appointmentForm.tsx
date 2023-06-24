import { Button, DatePicker, Form, Select, message } from 'antd';
import apiService from '../api/service';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { Validator, appointmentValidator } from '@hmis/gatekeeper';
import {ENUMS} from "@hmis/gatekeeper"
import { toSentenceCase } from '../helpers/strings';

interface IProps {
	editData?: any;
	closeModal: () => void;
}

const AppointmentForm = ({ closeModal, editData }: IProps) => {
	const [form] = Form.useForm();
	const isEdit = Object.keys(editData || {}).length > 0;
	const addAppointment = apiService('/appointment/add');
	const updateAppointment = apiService('/appointment/edit');

	const mutation = useMutation({
		mutationFn: (values: any) => {
			return isEdit ? updateAppointment({ data: values }) : addAppointment({ data: values });
		},
	});

	const modalClose = () => {
		form.resetFields();
		closeModal();
	};

	const handleCreateUpdateAppointment = async () => {
		form.validateFields();
		const values = { ...form.getFieldsValue(), ...(isEdit ? { _id: editData._id } : {}) };
		const errors = Validator.onlyValidate(
			values,
			isEdit
				? appointmentValidator.updateAppointmentSchema
				: appointmentValidator.createAppointmentSchema
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
			<Button type="primary" onClick={handleCreateUpdateAppointment}>
				Confirm Appointment
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

	return {
		ActionButtons,
		FormContainer,
	};
};

export default AppointmentForm;
