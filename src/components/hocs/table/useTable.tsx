import { useQuery } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useState } from 'react'

import apiService from 'src/api/service'
import { TableHocProps } from 'src/components/hocs/table'
import { configDefaultState } from 'src/context/config'

interface PaginatedListIResponse {
	docs: any[]
	totalDocs: number
	limit: number
	totalPages: number
	page: number
	pagingCounter: number
	hasPrevPage: boolean
	hasNextPage: boolean
	prevPage: number | null
	nextPage: number | null
}

const defaultTableResponse: PaginatedListIResponse = {
	docs: [],
	totalDocs: 0,
	limit: 15,
	totalPages: 1,
	page: 1,
	pagingCounter: 1,
	hasPrevPage: false,
	hasNextPage: false,
	prevPage: null,
	nextPage: null,
}

const useTable = <RecordType,>(props: TableHocProps<RecordType>) => {
	const [tableData, setTableData] = useState<PaginatedListIResponse>(defaultTableResponse)

	const { data: configResponse } = useQuery({
		queryKey: ['config'],
		queryFn: () => apiService('/config', 'GET')(),
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});
	const config = configResponse?.data || configDefaultState

	const [formModalVisible, setFormModalVisible] = useState(false)
	const [infoModalVisible, setInfoModalVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [selectedRows, setSelectedRows] = useState<RecordType[]>([])
	const [form] = Form.useForm()

	const hideFormModal = () => setFormModalVisible(false)
	const showFormModal = () => setFormModalVisible(true)

	const hideInfoModal = () => setInfoModalVisible(false)
	const showInfoModal = () => setInfoModalVisible(true)

	const showDeleteAction = selectedRows.length > 0
	const showEditAction = selectedRows.length === 1
	const showInfoAction = selectedRows.length === 1

	const onClickEdit = () => {
		setSelectedRows([])
	}

	const onClickDelete = async () => {
		// @ts-ignore
		const promises = selectedRows.map(t => deleteData(t._id))
		const responses = await Promise.all(promises)

		console.log({ responses })
		setSelectedRows([])
	}

	const onClickInfoCancel = () => {
		setSelectedRows([])
		hideInfoModal()
	}

	const getData = async () => {
		if (!props.routes?.get) return
		setLoading(true)

		try {
			const { data: response } = await props.routes.get()
			console.log({ response })
			setTableData(response)
		} catch (err) {
			setTableData(defaultTableResponse)
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
			hideFormModal()
		}

	const handleCancelOnModal: React.MouseEventHandler<HTMLAnchorElement> &
		React.MouseEventHandler<HTMLButtonElement> = () =>
		// e
		{
			hideFormModal()
		}

	const onFinishFormValues = (values: any) => {
		if (!props.onFinishFormValues) return
		// TODO: handle the form values
		props.onFinishFormValues(values)
	}

	return {
		state: {
			tableData,
			formModalVisible,
			loading,
			form,
			selectedRows,

			// constants
			showDeleteAction,
			showEditAction,
			showInfoAction,
			config,
			infoModalVisible,
		},

		stateUpdater: {
			setTableData,
			setFormModalVisible,
			setLoading,
			setSelectedRows,
			setInfoModalVisible,
		},

		actions: {
			hideFormModal,
			showFormModal,
			hideInfoModal,
			showInfoModal,
			getData,
			editData,
			deleteData,
			handleOkOnModal,
			handleCancelOnModal,
			onFinishFormValues,
			onClickEdit,
			onClickInfoCancel,
			onClickDelete,
		},
	}
}

export default useTable
