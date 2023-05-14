import apiService from 'api/service'
import { PlusCircleOutlined } from '@ant-design/icons'
import { isString, toSentenceCase } from 'helpers/strings'
import React, { Fragment, useEffect, useState } from 'react'
import ResourceSearch from 'components/permissions/resourcesSearch'
import { Button, Checkbox, Descriptions, Drawer, Form, Input, Tabs, Typography } from 'antd'

interface IPermission {
	[resourceTypeName: string]: {
		actions: {
			[actionPermissionName: string]: {
				allowAll: boolean
				allowSelf: boolean
				resourceIds: string[]
			}
		}
		independent: {
			[independentPermissionName: string]: boolean
		}
	}
}

export interface IPayload {
	displayName: string
	description?: string
	permissions: IPermission
}

interface IResourceType {
	name: string
	description: string
	availablePermissions: {
		independent: string[]
		actions: string[]
	}
}

type SpecialPermission = 'ALL' | 'INDEPENDENT'

interface IEditData {
	_id: string
	displayName: string
	description?: string
	permissions: {
		[resourceTypeName: string]: {
			[permissionName: string]: SpecialPermission | string[] // Array<ObjectId | 'SELF'>
		}
	}
}

interface IProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isEdit: boolean
	onDrawerClose: () => void
	data?: IEditData
}

const RoleDrawer: React.FC<IProps> = ({
	isEdit,
	data: editData,
	isOpen,
	setIsOpen,
	onDrawerClose,
}) => {
	const [form] = Form.useForm()
	const [payload, setPayload] = useState<IPayload | null>(null)
	const [currentResourceType, setCurrentResourceType] = useState<IResourceType | null>(null)
	const [allResourceTypes, setAllResourceTypes] = useState<IResourceType[]>([])
	const getResources = apiService<IResourceType[]>('GET', '/resource-types/all')

	useEffect(() => {
		getResources()
			.then(({ data }) => {
				setAllResourceTypes(data)
				setCurrentResourceType(data[0])
				if (isEdit) {
					form.setFieldValue('name', editData?.displayName)
					form.setFieldValue('description', editData?.description ?? '')
				} else {
					form.setFieldValue('name', '')
					form.setFieldValue('description', '')
				}

				const newPermissions = data.reduce<IPermission>(
					(acc, resourceType) => ({
						...acc,
						[resourceType.name]: {
							actions: resourceType.availablePermissions.actions.reduce((resAcc, actionPerm) => {
								const currentPermission = editData?.permissions[resourceType.name]?.[actionPerm]
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
											? !isString(currentPermission) && currentPermission.filter(t => t !== 'SELF')
											: [],
									},
								}
							}, {}),
							independent: resourceType.availablePermissions.independent.reduce(
								(resAcc, independentPerm) => {
									const currentPermission =
										editData?.permissions[resourceType.name]?.[independentPerm]
									return {
										...resAcc,
										[independentPerm]: currentPermission
											? isString(currentPermission) && currentPermission === 'INDEPENDENT'
											: false,
									}
								},
								{}
							),
						},
					}),
					{}
				)

				setPayload({
					displayName: editData?.displayName ?? '',
					description: editData?.description ?? '',
					permissions: newPermissions,
				})
			})
			.catch(console.log)
	}, [])

	const onResourceChange = (resourceActualName: string) => {
		const resource = allResourceTypes.find(t => t.name === resourceActualName)
		setCurrentResourceType(resource ?? null)
	}

	const closeDrawer = () => {
		if (isEdit) setPayload(null)
		setIsOpen(false)
		onDrawerClose()
	}

	const handleAllowAll = (checked: boolean, resourceName: string, permissionName: string) => {
		setPayload(prev => {
			if (!prev) return null
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
			}
		})
	}

	const handleAllowIndependent = (
		checked: boolean,
		resourceName: string,
		permissionName: string
	) => {
		setPayload(prev => {
			if (!prev) return null
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
			}
		})
	}

	const handleAllowSelf = (checked: boolean, resourceName: string, permissionName: string) => {
		setPayload(prev => {
			if (!prev) return null
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
			}
		})
	}

	const handleSubmitPermission = async () => {}

	const updateName = (name: string) => {
		setPayload(prev => {
			if (!prev) return null
			return { ...prev, displayName: name }
		})
	}

	const updateDescription = (desc: string) => {
		setPayload(prev => {
			if (!prev) return null
			return { ...prev, description: desc }
		})
	}

	const onSelectResourceId = (resourceIds: string[]) => {}

	return (
		<Fragment>
			<Button
				type='primary'
				className='mx-3'
				onClick={() => setIsOpen(true)}
				icon={<PlusCircleOutlined />}
			>
				Add Role
			</Button>

			<Drawer
				destroyOnClose
				open={isOpen}
				onClose={closeDrawer}
				width='50vw'
				title={`${isEdit ? 'Update' : 'Create'} Role`}
				footer={
					<div className='flex gap-2 h-12 items-center justify-end'>
						<Button onClick={closeDrawer}>Cancel</Button>
						<Button type='primary' onClick={handleSubmitPermission}>
							Confirm Create Role
						</Button>
					</div>
				}
			>
				<Form
					form={form}
					labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
					wrapperCol={{ xs: { span: 24 }, sm: { span: 18 } }}
				>
					<Form.Item
						rules={[{ required: true, message: 'Name is required' }]}
						name='name'
						label='Name'
					>
						<Input
							required
							value={payload?.displayName}
							onChange={e => updateName(e.target.value)}
						/>
					</Form.Item>

					<Form.Item name='description' label='Description'>
						<Input.TextArea
							value={payload?.description}
							onChange={e => updateDescription(e.target.value)}
						/>
					</Form.Item>

					<Tabs
						size='small'
						tabPosition='left'
						onChange={onResourceChange}
						defaultValue={currentResourceType?.name}
						items={Object.entries(payload?.permissions ?? {}).map(
							([resourceName, resPermissions]) => ({
								key: resourceName,
								value: resourceName,
								label: toSentenceCase(resourceName),
								children: (
									<Fragment>
										<Descriptions size='middle'>
											<Descriptions.Item label='Resource'>
												{toSentenceCase(resourceName)}
											</Descriptions.Item>
										</Descriptions>

										<div className='mb-2 ml-[2px]'>
											<Typography.Text>Independent Permissions</Typography.Text>
										</div>

										{Object.entries(resPermissions.independent).map(([permissionName, actions]) => (
											<div className='bg-gray-100 rounded-md p-2 mb-2 flex items-center justify-between'>
												<Typography.Text strong>{toSentenceCase(permissionName)}</Typography.Text>

												<div className=''>
													<Checkbox
														onChange={e =>
															handleAllowIndependent(e.target.checked, resourceName, permissionName)
														}
													>
														Allow
													</Checkbox>
												</div>
											</div>
										))}

										<div className='mt-10 mb-2 ml-[2px]'>
											<Typography.Text>Action Permissions</Typography.Text>
										</div>

										{Object.keys(resPermissions.actions).map(permissionName => (
											<div className='bg-gray-100 rounded-md p-2 mb-3'>
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
			</Drawer>
		</Fragment>
	)
}

export default RoleDrawer
