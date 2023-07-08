import { z } from 'zod';
import { ReactNode } from 'react';
import { RecoilState } from 'recoil';
import { DrawerProps, FormInstance, ModalProps, TableProps } from 'antd';

export interface DefaultParams {
	data?: any;
	params?: { pageSize: number; pageNumber: number };
}

export interface SelectedRowsAtom<RecordType> {
	selectedRows: RecordType[];
	showEditAction: boolean;
	showDeleteAction: boolean;
	showInfoAction: boolean;
	formModalOpen: boolean;
}

export interface TableHocProps<RecordType> {
	tableProps: TableProps<RecordType>;
	modalProps?: ModalProps;
	title: string;
	actionButtons?: ReactNode;
	hideTitle?: boolean;
	addButtonLabel?: string;
	showCreatedTime?: boolean;
	showUpdatedTime?: boolean;
	showSerialNo?: boolean;
	modifyInfoDetails?: (data: Record<string, any>) => Record<string, string>;
	notToShowInInfo?: string[];
	form?: ReactNode;
	drawerProps?: DrawerProps;
	popupType: 'modal' | 'drawer';
	editable?: boolean;
	selectedRowsAtom: RecoilState<SelectedRowsAtom<RecordType>>;
	infoModalProps?: ModalProps;
	routes: {
		list: (data?: DefaultParams) => Promise<any>;
		delete?: (data?: DefaultParams) => Promise<any>;
		details?: (data?: DefaultParams) => Promise<any>;
	};
	listBody: { query: Record<string, any>; options?: Record<string, any> };
}

export interface ITableOptions {
	page: number;
	limit: number;
}

export interface IFormProps {
	editData: any;
	form: FormInstance<any>;
	isEdit: boolean;
}

export type DataTransformer = (
	values: Record<string, any>
) => Record<string, any> | Promise<Record<string, any>>;

export interface IUseTableProps {
	add?: {
		endpoint: string;
		validatorSchema: z.AnyZodObject;
	};
	update?: {
		endpoint: string;
		validatorSchema: z.AnyZodObject;
	};
	atomKey: string;
	okActionButtonLabel: string;
}
