import { SearchOutlined } from '@ant-design/icons'
import { Checkbox, Select, Typography } from 'antd'
import debounce from 'lodash.debounce'
import React, { Fragment, useState } from 'react'

import apiService from 'src/api/service'
import { IPayload } from 'src/components/permissions/drawer'
import { toSentenceCase } from 'src/helpers/strings'

interface IProps {
	permissionName: string
	resourceName: string
	payload: IPayload | null
	onSelectResourceId: (resourceIds: string[]) => void
	handleAllowSelf: (checked: boolean, resourceName: string, permissionName: string) => void
	handleAllowAll: (checked: boolean, resourceName: string, permissionName: string) => void
}

const ResourceSearch: React.FC<IProps> = ({
	permissionName,
	onSelectResourceId,
	payload,
	resourceName,
	handleAllowAll,
	handleAllowSelf,
}) => {
	const [options, setOptions] = useState<Array<{ label: string; value: string }>>([])
	const getResourcesByResourceType = apiService('POST', '/api/permission/resources')

	// TODO
	const handleGetOptions = debounce(async (value: string) => {
		const { data } = await getResourcesByResourceType({
			data: { resourceName } as any,
		})
		setOptions(data)
	}, 500)

	return (
		<Fragment>
			<div className='flex items-center justify-between'>
				<Typography.Text strong>{toSentenceCase(permissionName)}</Typography.Text>

				<div className=''>
					<Checkbox
						onChange={e => handleAllowAll(e.target.checked, resourceName, permissionName)}
						checked={payload?.permissions[resourceName].actions[permissionName].allowAll}
					>
						Allow All
					</Checkbox>

					<Checkbox
						onChange={e => handleAllowSelf(e.target.checked, resourceName, permissionName)}
						checked={payload?.permissions[resourceName].actions[permissionName].allowSelf}
						disabled={payload?.permissions[resourceName].actions[permissionName].allowAll}
					>
						Allow Self
					</Checkbox>
				</div>
			</div>

			<div className='mt-2'>
				<Select
					allowClear
					showSearch
					mode='multiple'
					options={options}
					className='mt-0 block'
					defaultActiveFirstOption={false}
					onChange={resourceIds => onSelectResourceId(resourceIds)}
					onSearch={handleGetOptions}
					placeholder={`Select Resources to	allow ${toSentenceCase(
						permissionName
					)} on ${resourceName}`}
					disabled={payload?.permissions?.[resourceName]?.actions?.[permissionName]?.allowAll}
					suffixIcon={<SearchOutlined />}
				/>
			</div>
		</Fragment>
	)
}

export default ResourceSearch
