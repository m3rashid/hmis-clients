import React from 'react';

interface IProps {
	value: string;
	setValue: (value: string) => void;
}

const AggregationWriter: React.FC<IProps> = () => {
	return (
		<div className="">Aggregation writer</div>
	);
};

export default AggregationWriter;
