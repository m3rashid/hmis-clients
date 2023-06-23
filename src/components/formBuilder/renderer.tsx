import type { FC } from 'react';
import { Form } from 'antd';

import { IFormBuilderMetaProps, IFormRenderProps } from './types';
import { widgets } from './map';

type IFormRendererProps = FC<IFormRenderProps> & {
	///
};

const FormRenderer: IFormRendererProps = ({ meta }) => {
	return (
		<>
			{meta.map(
				({
					widgetProps,
					widgetName,
					children,
					renderChildren = undefined,
					formItemProps = {},
					render = undefined,
				}: IFormBuilderMetaProps) => {
					const Widget = widgets[widgetName];
					let WidgetField = Widget.fieldTransformer
						? Widget.fieldTransformer(Widget)
						: Widget?.widget;

					if (render) {
						WidgetField = render;
					}

					if (children) {
						return (
							// @ts-ignore
							<WidgetField {...widgetProps}>
								<FormRenderer meta={children} />
							</WidgetField>
						);
					} else if (formItemProps) {
						return (
							<>
								<Form.Item {...formItemProps}>
									<WidgetField {...widgetProps} />
								</Form.Item>
							</>
						);
					} else
						return (
							//@ts-ignore
							<WidgetField {...widgetProps}>
								{renderChildren ? renderChildren : undefined}
							</WidgetField>
						);
				}
			)}
		</>
	);
};

export default FormRenderer;
