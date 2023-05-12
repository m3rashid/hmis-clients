import ResourceAutoComplete from 'components/permissions/resourcesSearch'
import { PlusCircleOutlined } from '@ant-design/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Checkbox, Drawer, Form, Input, Tabs, Typography, message } from 'antd'
import { RolePermission } from 'definitions/modules/permission'
import { CreateOrEditRoleReqBody } from 'definitions/api/permission'
import { toSentenceCase } from 'helpers/strings'
import apiService from 'api/service'

interface IProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isEdit: boolean
	onDrawerClose: () => void
	data?: {
		name: string
		description: string
		_id: string
		permissions: RolePermission
	}
}

export interface IPayload {
	[packageName: string]: {
		[resourceType: string]: {
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
}

const RoleDrawer: React.FC<IProps> = ({
	isEdit,
	data: editData,
	isOpen,
	setIsOpen,
	onDrawerClose,
}) => {
	const [form] = Form.useForm()
	const [payload, setPayload] = useState<IPayload>()
	const [currentApp, setCurrentApp] = useState<any>(null)
	const [installedApps, setInstalledApps] = useState<any[]>([])
	const getApps = apiService('POST', '/api/permission/apps/installed')
	const createOrEditRole = apiService<any, CreateOrEditRoleReqBody>(
		'POST',
		'/api/permission/role/createOrEdit'
	)
	const [currentResourceType, setCurrentResourceType] = useState('')

	useEffect(() => {
		getApps()
			.then(({ data }) => {
				setInstalledApps(data)
				setCurrentApp(data[0])
				if (isEdit) {
					form.setFieldValue('name', editData?.name)
					form.setFieldValue('description', editData?.description ?? '')
				} else {
					form.setFieldValue('name', '')
					form.setFieldValue('description', '')
				}

				setPayload(
					data.reduce((acc: any, app: any) => {
						const resources = Object.entries(app.manifest?.permissions || {})
						return {
							...acc,
							[app.packageName]: resources.reduce(
								(innerAcc, [resourceTypeName, resourceTypePermissions]) => {
									return {
										...innerAcc,
										[resourceTypeName]: {
											actions: (resourceTypePermissions as any).actions.reduce(
												(tAcc: any, t: string) => {
													if (
														isEdit &&
														editData?.permissions?.[app.packageName]?.[resourceTypeName]?.[t]
													) {
														return {
															...tAcc,
															[t]: {
																allowAll:
																	editData?.permissions?.[app.packageName]?.[resourceTypeName]?.[
																		t
																	] === 'all',
																allowSelf:
																	editData?.permissions?.[app.packageName]?.[resourceTypeName]?.[
																		t
																	].includes('self'),
																resourceIds: !Array.isArray(
																	editData?.permissions?.[app.packageName]?.[resourceTypeName]?.[t]
																)
																	? []
																	: editData?.permissions?.[app.packageName]?.[
																			resourceTypeName
																			// @ts-ignore
																	  ]?.[t].filter(a => a !== 'self'),
															},
														}
													}

													return {
														...tAcc,
														[t]: {
															allowAll: false,
															allowSelf: false,
															resourceIds: [],
														},
													}
												},
												{}
											),
											independent: (resourceTypePermissions as any)?.independent.reduce(
												(independentAcc: any, independentPermission: string) => {
													if (
														isEdit &&
														editData?.permissions?.[app.packageName]?.[resourceTypeName]?.[
															independentPermission
														] === 'independent'
													) {
														return {
															...independentAcc,
															[independentPermission]: true,
														}
													}
													return {
														...independentAcc,
														[independentPermission]: false,
													}
												},
												{}
											),
										},
									}
								},
								{}
							),
						}
					}, {})
				)
			})
			.catch(console.log)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onAppChange = (packageName: string) => {
		const app = installedApps.find(t => t.packageName === packageName)
		setCurrentApp(app ?? null)
		const resourceTypes = Object.keys(app.manifest?.permissions || {})
		setCurrentResourceType(resourceTypes[0])
	}

	const handleSubmitRole = async () => {
		try {
			await form.validateFields()
		} catch (err: any) {
			return
		}

		if (!payload) return

		const transformedPayload = Object.entries(payload).reduce((acc, [packageName, appInner]) => {
			const innerRoleDetails = Object.entries(appInner).reduce<RolePermission['resourceType']>(
				(appInnerAcc, [resourceType, resourceTypeInner]) => {
					const actionPermissions = Object.entries(resourceTypeInner.actions).reduce(
						(resourceTypeInnerAcc, [actionPermissionName, actionPermissionsInner]) => {
							if (actionPermissionsInner.allowAll) {
								return {
									...resourceTypeInnerAcc,
									[actionPermissionName]: 'all',
								}
							}
							if (
								actionPermissionsInner.resourceIds.length === 0 &&
								!actionPermissionsInner.allowSelf
							) {
								return { ...resourceTypeInnerAcc }
							}
							return {
								...resourceTypeInnerAcc,
								[actionPermissionName]: [
									...actionPermissionsInner.resourceIds,
									...(actionPermissionsInner.allowSelf ? ['self'] : []),
								],
							}
						},
						{}
					)

					const independentPermissions = Object.entries(resourceTypeInner.independent).reduce(
						(resourceTypeInnerAcc, [independentPermissionName, independentPermissionGranted]) => {
							if (!independentPermissionGranted) {
								return { ...resourceTypeInnerAcc }
							}
							return {
								...resourceTypeInnerAcc,
								[independentPermissionName]: 'independent',
							}
						},
						{}
					)

					if (
						Object.keys(actionPermissions).length === 0 &&
						Object.keys(independentPermissions).length === 0
					) {
						return {
							...appInnerAcc,
						}
					}

					return {
						...appInnerAcc,
						[resourceType]: {
							...actionPermissions,
							...independentPermissions,
						},
					}
				},
				{}
			)

			if (Object.keys(innerRoleDetails).length === 0) {
				return { ...acc }
			}

			return { ...acc, [packageName]: innerRoleDetails }
		}, {} as RolePermission)

		// TODO: handle edit
		try {
			const { data: responseData } = await createOrEditRole({
				data: {
					...(isEdit && editData?._id ? { _id: editData._id } : {}),
					name: form.getFieldValue('name'),
					description: form.getFieldValue('description') ?? '',
					permissions: transformedPayload ?? {},
				},
			})

			console.log(responseData)
			message.success(`Successfully Created role ${form.getFieldValue('name')}`)
			setPayload({})
			setIsOpen(false)
		} catch (err: any) {
			console.log(err)
			message.error(err.message || 'An Error occurred in creating role')
		}
	}

	const onClickIndependentPermission = (
		appName: string,
		resourceType: string,
		independentPermission: string,
		checked: boolean
	) => {
		setPayload(p => {
			if (!p) return p
			return {
				...p,
				[appName]: {
					...p[appName],
					[resourceType]: {
						...p[appName]?.[resourceType],
						independent: {
							...p[appName]?.[resourceType]?.independent,
							[independentPermission]: checked,
						},
					},
				},
			}
		})
	}

	const onChangeActionPermissions = (
		appName: string,
		resourceType: string,
		actionPermission: string,
		type: 'all' | 'self',
		checked: boolean
	) => {
		setPayload(p => {
			if (!p) return p
			return {
				...p,
				[appName]: {
					...p[appName],
					[resourceType]: {
						...p[appName]?.[resourceType],
						actions: {
							...p[appName]?.[resourceType].actions,
							[actionPermission]: {
								...p[appName]?.[resourceType]?.actions?.[actionPermission],
								...(type === 'all' ? { allowAll: checked } : { allowSelf: checked }),
							},
						},
					},
				},
			}
		})
	}

	const onSelectActionPermissionResourceIds = (
		appName: string,
		resourceType: string,
		actionPermission: string,
		resourceIds: string[]
	) => {
		setPayload(p => {
			if (!p) return p
			return {
				...p,
				[appName]: {
					...p[appName],
					[resourceType]: {
						...p[appName]?.[resourceType],
						actions: {
							...p[appName]?.[resourceType]?.actions,
							[actionPermission]: {
								...p[appName]?.[resourceType]?.actions?.[actionPermission],
								resourceIds,
							},
						},
					},
				},
			}
		})
	}

	const closeDrawer = () => {
		if (isEdit) {
			setPayload({})
		}
		setIsOpen(false)
		onDrawerClose()
	}

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
				title={`${isEdit ? 'Update' : 'Create'} User Role`}
				footer={
					<div className='flex gap-2 h-12 items-center justify-end'>
						<Button onClick={closeDrawer}>Cancel</Button>
						<Button type='primary' onClick={handleSubmitRole}>
							Confirm Create Role
						</Button>
					</div>
				}
			>
				<Form form={form}>
					<Form.Item
						rules={[{ required: true, message: 'Name is required' }]}
						name='name'
						label='Role Name'
					>
						<Input required />
					</Form.Item>

					<Form.Item name='description' label='Description'>
						<Input.TextArea />
					</Form.Item>

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
				</Form>
			</Drawer>
		</Fragment>
	)
}

export default RoleDrawer
