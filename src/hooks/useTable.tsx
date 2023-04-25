import { Form } from 'antd'
import { useState } from 'react'
import { TableHocProps } from 'components/hocs/table'
import { useRecoilValue } from 'recoil'
import configAtom from 'recoilAtoms/config'

const useTable = <RecordType,>(props: TableHocProps<RecordType>) => {
	const [tableData, setTableData] = useState([])
	const config = useRecoilValue(configAtom)
	const [modalVisible, setModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [selectedRows, setSelectedRows] = useState<RecordType[]>([])
	const [form] = Form.useForm()

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	const showDeleteAction = selectedRows.length > 0
	const showEditAction = selectedRows.length === 1
	const showInfoAction = selectedRows.length === 1

	const onClickEdit = () => {
		const data = selectedRows[0]
		console.log({ data })
		setSelectedRows([])
	}

	const onClickDelete = async () => {
		// @ts-ignore
		const promises = selectedRows.map(t => deleteData(t._id))
		const responses = await Promise.all(promises)

		console.log({ responses })
		setSelectedRows([])
	}

	const onClickInfo = () => {
		const data = selectedRows[0]
		console.log({ data })
		setSelectedRows([])
	}

	const getData = async () => {
		if (!props.routes?.get) return
		setLoading(true)

		try {
			const { data: response } = await props.routes.get()
			console.log({ response })
			setTableData(response)
		} catch (err) {
			setTableData([])
		} finally {
			setLoading(false)
		}
	}

	const editData = async (data: any) => {
		if (!props.routes?.edit) return
		setLoading(true)
		try {
			const { data: response } = await props.routes.edit({ data })
			console.log({ response })
		} catch (err) {
		} finally {
			setLoading(false)
		}
	}

	const deleteData = async (id: string) => {
		if (!props.routes?.delete) return
		setLoading(true)

		try {
			const { data: response } = await props.routes.delete({ data: id })
			console.log({ response })
		} catch (err) {
		} finally {
			setLoading(false)
		}
	}

	const handleOkOnModal = () =>
		// e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		{
			// TODO: axios call to create the entry
			hideModal()
		}

	const handleCancelOnModal = () =>
		// e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		{
			hideModal()
		}

	const onFinishFormValues = (values: any) => {
		console.log({ values })
	}

	return {
		state: {
			tableData,
			modalVisible,
			loading,
			form,
			selectedRows,

			// constants
			showDeleteAction,
			showEditAction,
			showInfoAction,
			config,
		},

		stateUpdater: {
			setTableData,
			setModalVisible,
			setLoading,
			setSelectedRows,
		},

		actions: {
			hideModal,
			showModal,
			getData,
			editData,
			deleteData,
			handleOkOnModal,
			handleCancelOnModal,
			onFinishFormValues,
			onClickEdit,
			onClickInfo,
			onClickDelete,
		},
	}
}

export default useTable
