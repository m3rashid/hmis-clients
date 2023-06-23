import type { FormItemProps } from 'antd';
import { FC } from 'react';

export type WidgetMap = Record<
	string,
	{
		widget: FC<any>;
		fieldTransformer?: (field: any) => FC<any>;
	}
>;

export interface IFormBuilderMetaProps {
	widgetName: string;
	widgetProps?: Record<any, any>;
	children?: any;
	renderChildren?: any;
	formItemProps?: FormItemProps;
	render?: FC;
}

export interface IFormRenderProps {
	meta: IFormBuilderMetaProps[];
}

export type Register = (
	widgetName: string,
	widget: FC<any>,
	fieldTransformer?: (params?: any) => any
) => void;
