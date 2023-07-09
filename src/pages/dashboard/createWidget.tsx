import React from 'react';
import AggregationWriter from '../../components/dashboard/aggregationWriter';

interface IProps {}

const CreateWidget: React.FC<IProps> = () => {
	const [value, setValue] = React.useState('[]');

	return (
		<>
			<div>CreateWidget</div>
			<AggregationWriter {...{ value, setValue }} />
		</>
	);
};

export default CreateWidget;
