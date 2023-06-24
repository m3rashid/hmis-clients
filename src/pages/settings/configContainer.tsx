// import { useQuery } from '@tanstack/react-query';
import { Typography } from 'antd';
import React from 'react';

// import apiService from '../../api/service';
// import { camelCaseToSentenceCase } from '../../helpers/strings';
import { IConfigExposedState } from '../../recoil/config';

// const convertToFormSchema = (config: any, widgetType?: string): RJSFSchema => {
// 	const properties: RJSFSchema['properties'] = Object.entries(config).reduce(
// 		(acc, [key, value], index) => {
// 			return {
// 				...acc,
// 				[key]: {
// 					type: 'string',
// 					title: camelCaseToSentenceCase(key)
// 						.split(' ')
// 						.map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
// 						.join(' '),
// 					default: value,
// 					...(widgetType ? { format: widgetType } : {}),
// 					key: `${index}-${key}`,
// 					...(key === 'theme'
// 						? {
// 								title: '',
// 								oneOf: [
// 									{ const: 'light', title: 'Light' },
// 									{ const: 'dark', title: 'Dark' },
// 								],
// 						  }
// 						: {}),
// 				},
// 			};
// 		},
// 		{}
// 	);

// 	return {
// 		type: 'object',
// 		properties,
// 		required: Object.keys(config),
// 	};
// };

interface IProps {
	title: string;
	configKey: keyof IConfigExposedState;
	widgetType?: string;
	className?: string;
}

const ConfigContainer: React.FC<IProps> = (props) => {
	// const config = useGetConfig()

	// const handleSave = (entryName: keyof IConfigExposedState) => (values: any) => {
		// console.log({ values, entryName });
		// TODO: Handle Mutation
		// setConfig({
		// 	...configResponse?.data,
		// 	[entryName]: values.formData,
		// })
		// message.success('Config saved successfully');
	// };

	return (
		<div className={`grid gap-10 grid-cols-1 md:grid-cols-2 ${props.className}`}>
			<div className="">
				<Typography.Title level={4} className="text-center mb-10">
					{props.title}
				</Typography.Title>

				<br />

				{/* <Form
					formSchema={convertToFormSchema(config[props.configKey], props.widgetType)}
					onFinishFormValues={handleSave(props.configKey)}
				/> */}
			</div>
		</div>
	);
};

export default ConfigContainer;
