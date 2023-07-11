import React from 'react';
import Editor from '@monaco-editor/react';
import { useGetConfig } from '../../recoil/config';

interface IProps {
	value: string;
	setValue: (value: string) => void;
}

const AggregationWriter: React.FC<IProps> = ({ setValue, value }) => {
	const config = useGetConfig();

	return (
		<div className="flex mt-4 flex-row items-center justify-end space-x-2">
			<Editor
				theme={config.theme.mode === 'dark' ? 'vs-dark' : 'vs-light'}
				height={600}
				language="json"
				value={value}
				className="mt-4"
				onChange={(text) => setValue(text || '')}
			/>
		</div>
	);
};

export default AggregationWriter;
