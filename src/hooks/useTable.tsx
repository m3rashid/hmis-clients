import axios from 'axios'
import { Form } from 'antd'
import { useState } from 'react'
import { TableHocProps } from 'hocs/table'

/**
 * @description The base route for the API
 * routes will be appended to this like so:
 * baseRoute/get -> GET
 * baseRoute/edit-or-create -> POST
 * baseRoute/delete -> POST
 */
const useTable = (props: TableHocProps) => {
	const [tableData, setTableData] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()

	// eslint-disable-next-line no-undef
	const apiBaseRoute = process.env.REACT_APP_BACKEND_BASE_URL

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	const getData = async () => {
		if (!props.routes?.get) return
		setLoading(true)

		try {
			const { data } = await axios.get(apiBaseRoute + props.routes?.get)
			console.log({ tableData: data })
			setTableData(data)
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
			await axios.post(apiBaseRoute + props.routes?.edit, data)
		} catch (err) {
		} finally {
			setLoading(false)
		}
	}

	const deleteData = async (id: string) => {
		if (!props.routes?.delete) return
		setLoading(true)

		try {
			await axios.post(apiBaseRoute + props.routes?.delete, { id })
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
		},

		stateUpdater: {
			setTableData,
			setModalVisible,
			setLoading,
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
		},
	}
}

export default useTable
