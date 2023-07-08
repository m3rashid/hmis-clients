import { Button, Checkbox, Descriptions, Form, Input, Tabs, Typography } from 'antd';
import { Fragment, useEffect, useState } from 'react';

import apiService from '../../api/service';
import ResourceSearch from './resourcesSearch';
import { isString, toSentenceCase } from '../../helpers/strings';

interface IPermission {
	[resourceTypeName: string]: {
		actions: {
			[actionPermissionName: string]: {
				allowAll: boolean;
				allowSelf: boolean;
				resourceIds: string[];
			};
		};
		independent: {
			[independentPermissionName: string]: boolean;
		};
	};
}

export interface IPayload {
	displayName: string;
	description?: string;
	permissions: IPermission;
}

interface IResourceType {
	name: string;
	description: string;
	availablePermissions: {
		independent: string[];
		actions: string[];
	};
}

type SpecialPermission = 'ALL' | 'INDEPENDENT';
export interface IEditData {
	_id: string;
	displayName: string;
	description?: string;
	permissions: {
		[resourceTypeName: string]: {
			[permissionName: string]: SpecialPermission | string[]; // Array<ObjectId | 'SELF'>
		};
	};
}

export interface IRoleDrawerProps {
	editData?: any;
	closeModal: () => void;
}

const RoleDrawer = ({ editData, closeModal }: IRoleDrawerProps) => {
	const [form] = Form.useForm();
	const [payload, setPayload] = useState<IPayload | null>(null);
	const [currentResourceType, setCurrentResourceType] = useState<IResourceType | null>(null);
	const [allResourceTypes, setAllResourceTypes] = useState<IResourceType[]>([]);
	const getResources = apiService<IResourceType[]>('/role/resource/all', 'GET');
	const isEdit = Object.keys(editData ?? {}).length > 0;

	useEffect(() => {
		getResources()
			.then(({ data }) => {
				setAllResourceTypes(data);
				setCurrentResourceType(data[0]);
				if (isEdit) {
					form.setFieldValue('name', editData?.displayName);
					form.setFieldValue('description', editData?.description ?? '');
				} else {
					form.setFieldValue('name', '');
					form.setFieldValue('description', '');
				}

				const newPermissions = data.reduce<IPermission>(
					(acc, resourceType) => ({
						...acc,
						[resourceType.name]: {
							actions: resourceType.availablePermissions.actions.reduce((resAcc, actionPerm) => {
								const currentPermission = editData?.permissions[resourceType.name]?.[actionPerm];
								return {
									...resAcc,
									[actionPerm]: {
										allowAll: currentPermission
											? isString(currentPermission) && currentPermission === 'ALL'
											: false,
										allowSelf: currentPermission
											? !isString(currentPermission) && currentPermission?.includes('SELF')
											: false,
										resourceIds: currentPermission
											? !isString(currentPermission) &&
											  currentPermission.filter((t: any) => t !== 'SELF')
											: [],
									},
								};
							}, {}),
							independent: resourceType.availablePermissions.independent.reduce(
								(resAcc, independentPerm) => {
									const currentPermission =
										editData?.permissions[resourceType.name]?.[independentPerm];
									return {
										...resAcc,
										[independentPerm]: currentPermission
											? isString(currentPermission) && currentPermission === 'INDEPENDENT'
											: false,
									};
								},
								{}
							),
						},
					}),
					{}
				);

				setPayload({
					displayName: editData?.displayName ?? '',
					description: editData?.description ?? '',
					permissions: newPermissions,
				});
			})
			.catch(console.log);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onResourceChange = (resourceActualName: string) => {
		const resource = allResourceTypes.find((t) => t.name === resourceActualName);
		setCurrentResourceType(resource ?? null);
	};

	const handleAllowAll = (checked: boolean, resourceName: string, permissionName: string) => {
		setPayload((prev: any = {}) => {
			return {
				...prev,
				permissions: {
					...prev.permissions,
					[resourceName]: {
						...prev.permissions[resourceName],
						actions: {
							...prev.permissions[resourceName].actions,
							[permissionName]: {
								...prev.permissions[resourceName].actions[permissionName],
								allowAll: checked,
							},
						},
					},
				},
			};
		});
	};

	const handleAllowIndependent = (
		checked: boolean,
		resourceName: string,
		permissionName: string
	) => {
		setPayload((prev: any = {}) => {
			return {
				...prev,
				permissions: {
					...prev.permissions,
					[resourceName]: {
						...prev.permissions[resourceName],
						independent: {
							[permissionName]: checked,
						},
					},
				},
			};
		});
	};

	const handleAllowSelf = (checked: boolean, resourceName: string, permissionName: string) => {
		setPayload((prev: any = {}) => {
			return {
				...prev,
				permissions: {
					...prev.permissions,
					[resourceName]: {
						...prev.permissions[resourceName],
						actions: {
							...prev.permissions[resourceName].actions,
							[permissionName]: {
								...prev.permissions[resourceName].actions[permissionName],
								allowSelf: checked,
							},
						},
					},
				},
			};
		});
	};

	const updateName = (name: string) => {
		setPayload((prev: any = {}) => ({ ...prev, displayName: name }));
	};

	const updateDescription = (desc: string) => {
		setPayload((prev: any = {}) => ({ ...prev, description: desc }));
	};

	// resourceIds: string[]
	const onSelectResourceId = () => {};

	const handleCreateUpdateRole = () => {
		console.log({ payload });
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

	const FormContainer =  (
		<Fragment>
			<Form
				form={form}
				labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
				wrapperCol={{ xs: { span: 24 }, sm: { span: 18 } }}
			>
				<Form.Item
					rules={[{ required: true, message: 'Name is required' }]}
					name="name"
					label="Name"
				>
					<Input
						required
						value={payload?.displayName}
						onChange={(e) => updateName(e.target.value)}
					/>
				</Form.Item>

				<Form.Item name="description" label="Description">
					<Input.TextArea
						value={payload?.description}
						onChange={(e) => updateDescription(e.target.value)}
					/>
				</Form.Item>

				<Tabs
					size="small"
					tabPosition="left"
					onChange={onResourceChange}
					defaultValue={currentResourceType?.name}
					items={Object.entries(payload?.permissions ?? {}).map(
						([resourceName, resPermissions]) => ({
							key: resourceName,
							value: resourceName,
							label: toSentenceCase(resourceName),
							children: (
								<Fragment>
									<Descriptions size="middle">
										<Descriptions.Item label="Resource">
											{toSentenceCase(resourceName)}
										</Descriptions.Item>
									</Descriptions>

									<div className="mb-2 ml-[2px]">
										<Typography.Text>Independent Permissions</Typography.Text>
									</div>

									{Object.entries(resPermissions.independent).map(
										([
											permissionName,
											// actions
										]) => (
											<div className="rounded-md mb-2 flex items-center justify-between">
												<Typography.Text strong>{toSentenceCase(permissionName)}</Typography.Text>

												<div className="">
													<Checkbox
														onChange={(e) =>
															handleAllowIndependent(e.target.checked, resourceName, permissionName)
														}
													>
														Allow
													</Checkbox>
												</div>
											</div>
										)
									)}

									<div className="mt-10 mb-2 ml-[2px]">
										<Typography.Text>Action Permissions</Typography.Text>
									</div>

									{Object.keys(resPermissions.actions).map((permissionName) => (
										<div className="rounded-md mb-3">
											<ResourceSearch
												{...{
													payload,
													resourceName,
													onSelectResourceId,
													permissionName,
													handleAllowAll,
													handleAllowSelf,
												}}
											/>
										</div>
									))}
								</Fragment>
							),
						})
					)}
				/>
			</Form>
		</Fragment>
	);

	return {
		ActionButtons,
		FormContainer,
	};
};

export default RoleDrawer;
