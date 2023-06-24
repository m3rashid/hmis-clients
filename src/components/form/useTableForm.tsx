import { atom, useRecoilState } from 'recoil';
import { SelectedRowsAtom, defaultTableAtomContents } from '../table';
import { z } from 'zod';
import apiService from '../../api/service';
import { Button, Form, FormInstance, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { Validator } from '@hmis/gatekeeper';

const defaultValidator = z.object({});

export interface IFormProps {
	editData: any;
	form: FormInstance<any>;
	isEdit: boolean;
}

export type DataTransformer = (
		values: Record<string, any>
	) => Record<string, any> | Promise<Record<string, any>>;

interface IProps {
	add?: {
		endpoint: string;
		validatorSchema: z.AnyZodObject;
	};
	update?: {
		endpoint: string;
		validatorSchema: z.AnyZodObject;
	};
	atomKey: string;
	okActionButtonLabel: string;
}

const useTableForm = <T extends { _id: string }>(props: IProps) => {
	const [form] = Form.useForm();

	const selectedRowsAtom = atom<SelectedRowsAtom<T>>({
		key: props.atomKey,
		default: defaultTableAtomContents<T>(),
	});

	const [{ selectedRows }, setSelectedRows] = useRecoilState(selectedRowsAtom);
	const editData = selectedRows[0];
	const isEdit = Object.keys(editData || {}).length > 0;

	const addService = apiService(props.add ? props.add.endpoint : '');
	const updateService = apiService(props.update ? props.update.endpoint : '');

	const mutation = useMutation({
		mutationFn: (values: any) => {
			return isEdit ? updateService({ data: values }) : addService({ data: values });
		},
	});

	const closeModal = () => {
		form.resetFields();
		setSelectedRows((p) => ({ ...p, formModalOpen: false }));
	};

	const handleCreateUpdateService = async () => {
		form.validateFields();
		const values = {
			...form.getFieldsValue(),
			...(isEdit ? { _id: editData._id } : {}),
		};

		const errors = Validator.onlyValidate(
			values,
			isEdit
				? props.add
					? props.add.validatorSchema
					: defaultValidator
				: props.update
				? props.update.validatorSchema
				: defaultValidator
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
			<Button type="primary" onClick={handleCreateUpdateService}>
				Confirm Appointment
			</Button>
		</div>
	);

	return {
		form,
		isEdit,
		editData,
		mutation,
		closeModal,
		selectedRows,
		ActionButtons,
		selectedRowsAtom,
		handleCreateUpdateService,
	};
};

export default useTableForm;
