import { Fragment } from 'react';
import { Button, Form } from 'antd';
import apiService from '../../api/service';
import { useQuery } from '@tanstack/react-query';
import { MODELS, permissionKeys } from '@hmis/gatekeeper';

type IRoleResource = Record<MODELS.IDbSchemaKey, typeof permissionKeys>;
export interface IRoleDrawerProps {
	editData?: any;
	closeModal: () => void;
}

const RoleDrawer = ({ editData, closeModal }: IRoleDrawerProps) => {
	const [form] = Form.useForm();
	const isEdit = Object.keys(editData ?? {}).length > 0;

	const getResource = useQuery<any, any, IRoleResource[]>({
		queryKey: ['roleResource'],
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
		queryFn: apiService('/role/resource/all', 'GET'),
	});

	const handleCreateUpdateRole = () => {
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
			<Form form={form} layout="vertical"></Form>
		</Fragment>
	);

	return {
		ActionButtons,
		FormContainer,
	};
};

export default RoleDrawer;
