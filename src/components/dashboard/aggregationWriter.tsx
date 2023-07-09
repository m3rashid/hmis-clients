import React from 'react';
import Editor from '@monaco-editor/react';

interface IProps {
	value: string;
	setValue: (value: string) => void;
}

const AggregationWriter: React.FC<IProps> = ({ setValue, value }) => {
	return (
		<div className="flex mt-4 flex-row items-center justify-end space-x-2">
			<Editor
				theme="vs-dark"
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
