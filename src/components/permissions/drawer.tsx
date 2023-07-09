import {
	MODELS,
	modelNames,
	transformPermission,
	convertPermissionsToNumber,
} from '@hmis/gatekeeper';
import { Fragment } from 'react';
import apiService from '../../api/service';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Select } from 'antd';
import { camelCaseToSentenceCase, toSentenceCase } from '../../helpers/strings';

type IRoleResource = Record<MODELS.IDbSchemaKey, number>;
export interface IRoleDrawerProps {
	editData?: any;
	closeModal: () => void;
}

type EditCreateRoleReq = {
	payload: { name: string; permissions: Record<string, number> };
	query?: Record<string, any>;
};

const RoleDrawer = ({ editData, closeModal }: IRoleDrawerProps) => {
	const [form] = Form.useForm();
	const editRole = apiService<any, EditCreateRoleReq>('/role/role/edit');
	const createRole = apiService<any, EditCreateRoleReq>('/role/role/create');
	const isEdit = Object.keys(editData ?? {}).length > 0;

	const getResource = useQuery<any, any, { data: IRoleResource }>({
		queryKey: ['roleResource'],
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
		queryFn: apiService('/role/resource/all', 'GET'),
	});

	const initialValues = isEdit
		? {
				...editData,
				permissions: Object.entries(editData.permissions).reduce(
					(acc: any, [key, val]: any) => ({
						...acc,
						[key]: transformPermission(val),
					}),
					{}
				),
		  }
		: {};

	const handleCreateUpdateRole = async () => {
		await form.validateFields();
		const values = form.getFieldsValue();

		const permissions = { ...(editData || {}), ...values };
		delete permissions.name;
		const convertedPermissions = Object.entries(permissions).reduce(
			(acc, [key, value]) => ({
				...acc,
				...(value ? { [key]: convertPermissionsToNumber(value as any) } : {}),
			}),
			{} as Record<string, number>
		);

		const payload = { name: values.name, permissions: convertedPermissions };
		if (isEdit) await editRole({ data: { payload, query: { _id: editData._id } } });
		else await createRole({ data: { payload } });
		closeModal();
	};

	const ActionButtons = (
		<div className="flex gap-2 h-12 items-center justify-end">
			<Button onClick={() => closeModal()}>Cancel</Button>
			<Button type="primary" onClick={handleCreateUpdateRole}>
				Confirm Role
			</Button>
		</div>
	);

	const FormContainer = (
		<Fragment>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleCreateUpdateRole}
				initialValues={initialValues}
			>
				<Form.Item
					name="name"
					label="Role Name"
					rules={[{ required: true, message: 'Role Name is required' }]}
				>
					<Input placeholder="HMIS Doctor" />
				</Form.Item>

				{Object.keys(modelNames).map((t) => (
					<Form.Item name={t} label={camelCaseToSentenceCase(t)} key={t}>
						<Select
							mode="multiple"
							defaultValue={isEdit ? initialValues.permissions[t] : []}
							options={transformPermission(
								getResource.data?.data[t as MODELS.IDbSchemaKey] || 0
							).map((t) => ({
								value: t,
								label: toSentenceCase(t),
							}))}
						/>
					</Form.Item>
				))}
			</Form>
		</Fragment>
	);

	return {
		ActionButtons,
		FormContainer,
	};
};

export default RoleDrawer;
