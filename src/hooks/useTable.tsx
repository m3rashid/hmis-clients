import axios from 'axios'
import { Form } from 'antd'
import { useState } from 'react'

interface IProps<T> {
	baseRoute: string
}

/**
 * @description The base route for the API
 * routes will be appended to this like so:
 * baseRoute/get -> GET
 * baseRoute/edit-or-create -> POST
 * baseRoute/delete -> POST
 */
const useTable = <RecordType,>({ baseRoute }: IProps<RecordType>) => {
	const [tableData, setTableData] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	const getData = async () => {
		setLoading(true)

		try {
			const { data } = await axios.get(`${baseRoute}`)
			console.log({ tableData: data })
			setTableData(data)
		} catch (err) {
			setTableData([])
		} finally {
			setLoading(false)
		}
	}

	const editData = async (data: RecordType & { _id?: string }) => {
		setLoading(true)
		try {
			await axios.post(`${baseRoute}/edit-or-create`, data)
		} catch (err) {
		} finally {
			setLoading(false)
		}
	}

	const deleteData = async (id: string) => {
		setLoading(true)

		try {
			await axios.post(`${baseRoute}/delete`, { id })
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
