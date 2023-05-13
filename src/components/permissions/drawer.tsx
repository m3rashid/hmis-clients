import ResourceAutoComplete from 'components/permissions/resourcesSearch'
import { PlusCircleOutlined } from '@ant-design/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Checkbox, Drawer, Form, Input, Tabs } from 'antd'
// import { RolePermission } from 'definitions/modules/permission'
// import { CreateOrEditRoleReqBody } from 'definitions/api/permission'
import { toSentenceCase } from 'helpers/strings'
import apiService from 'api/service'

export interface IPayload {
	displayName: string
	description?: string
	permission: Array<{
		resourceType: string
		scope: string[]
		accessLevel: number
	}>
}

interface IResource {
	_id: string
	displayName: string
	actualName: string
	description?: string
	type: string
}

interface IProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isEdit: boolean
	onDrawerClose: () => void
	data?: IPayload & { _id: string }
}

const RoleDrawer: React.FC<IProps> = ({
	isEdit,
	data: editData,
	isOpen,
	setIsOpen,
	onDrawerClose,
}) => {
	const [form] = Form.useForm()
	const defaultPermission = { displayName: '', permission: [], description: '' }
	const [payload, setPayload] = useState<IPayload>(defaultPermission)
	const [currentResource, setCurrentResource] = useState<IResource | null>(null)
	const [allResources, setAllResources] = useState<IResource[]>([])
	const getResources = apiService('POST', '/resource/all')

	useEffect(() => {
		getResources()
			.then(({ data }: { data: IResource[] }) => {
				setAllResources(data)
				setCurrentResource(data[0])
				if (isEdit && editData) {
					form.setFieldValue('name', editData.displayName)
					form.setFieldValue('description', editData?.description ?? '')
					setPayload({
						displayName: editData.displayName,
						permission: editData.permission,
						description: editData.description,
					})
				} else {
					form.setFieldValue('name', '')
					form.setFieldValue('description', '')
				}
			})
			.catch(console.log)
	}, [])

	const onResourceChange = (resourceActualName: string) => {
		const resource = allResources.find(t => t.actualName === resourceActualName)
		setCurrentResource(resource ?? null)
	}

	const closeDrawer = () => {
		if (isEdit) setPayload(defaultPermission)
		setIsOpen(false)
		onDrawerClose()
	}

	const handleSubmitPermission = async () => {}

	return (
		<Fragment>
			<Button
				type='primary'
				className='mx-3'
				onClick={() => setIsOpen(true)}
				icon={<PlusCircleOutlined />}
			>
				Add Permission
			</Button>

			<Drawer
				destroyOnClose
				open={isOpen}
				onClose={closeDrawer}
				width='50vw'
				title={`${isEdit ? 'Update' : 'Create'} User Permission`}
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
						<Input required />
					</Form.Item>

					<Form.Item name='description' label='Description'>
						<Input.TextArea />
					</Form.Item>

					<Tabs
						size='small'
						tabPosition='left'
						onChange={onResourceChange}
						defaultValue={currentResource?.actualName}
						items={allResources?.map(t => ({
							key: t.actualName,
							value: t.actualName,
							label: toSentenceCase(t.displayName),
							children: <Fragment></Fragment>,
						}))}
					/>
					{/*
					<Tabs
						size='small'
						tabPosition='left'
						onChange={onAppChange}
						defaultValue={currentApp?.packageName}
						items={installedApps?.map(t => ({
							key: t.packageName,
							value: t.packageName,
							label: toSentenceCase(t.appName),
							children: (
								<Fragment>
									{Object.entries(currentApp?.manifest?.permissions || {}).length === 0 ? (
										<div className='w-full h-[300px] flex items-center justify-center'>
											<Typography.Text className='text-lg'>No Resources Found</Typography.Text>
										</div>
									) : (
										<Tabs
											size='small'
											tabPosition='top'
											defaultValue={currentResourceType}
											items={Object.entries(currentApp?.manifest?.permissions || {}).map(
												([resourceTypeName, resourceTypePermissions]) => ({
													key: resourceTypeName,
													value: resourceTypeName,
													label: toSentenceCase(resourceTypeName),
													children: (
														<Fragment key={resourceTypeName}>
															{((resourceTypePermissions as any).independent ?? []).length >= 0 ? (
																<Typography.Text className='block mb-2 ml-1 font-bold'>
																	Independent Permissions
																</Typography.Text>
															) : null}

															<div className='rounded-md p-2 flex flex-col gap-2'>
																{((resourceTypePermissions as any).independent ?? []).map(
																	(independentPermission: string) => {
																		return (
																			<div
																				key={independentPermission}
																				className='flex flex-row items-center justify-between mr-6'
																			>
																				<Typography.Text>
																					{toSentenceCase(independentPermission) +
																						' ' +
																						resourceTypeName}
																				</Typography.Text>

																				<Checkbox
																					className='mx-2 px-0'
																					checked={
																						payload?.[t.packageName]?.[resourceTypeName]
																							?.independent?.[independentPermission]
																					}
																					onChange={e => {
																						onClickIndependentPermission(
																							t.packageName,
																							resourceTypeName,
																							independentPermission,
																							e.target.checked
																						)
																					}}
																				>
																					Allow
																				</Checkbox>
																			</div>
																		)
																	}
																)}
															</div>

															{((resourceTypePermissions as any).actions ?? []).length >= 0 ? (
																<Typography.Text className='block mb-2 ml-1 mt-8 font-bold'>
																	Other Permissions
																</Typography.Text>
															) : null}
															<div className='flex flex-col gap-4'>
																{((resourceTypePermissions as any).actions ?? []).map(
																	(actionPermission: string) => {
																		return (
																			<ResourceAutoComplete
																				{...{
																					payload,
																					actionPermission,
																					key: actionPermission,
																					packageName: t.packageName,
																					resourceType: resourceTypeName,
																					onChangeActionCheckboxes: (
																						checked: boolean,
																						type: 'all' | 'self'
																					) => {
																						onChangeActionPermissions(
																							t.packageName,
																							resourceTypeName,
																							actionPermission,
																							type,
																							checked
																						)
																					},
																					onSelectResourceId: (resourceIds: string[]) => {
																						onSelectActionPermissionResourceIds(
																							t.packageName,
																							resourceTypeName,
																							actionPermission,
																							resourceIds
																						)
																					},
																				}}
																			/>
																		)
																	}
																)}
															</div>
														</Fragment>
													),
												})
											)}
										/>
									)}
								</Fragment>
							),
						}))}
					/>
				*/}
				</Form>
			</Drawer>
		</Fragment>
	)
}

export default RoleDrawer
