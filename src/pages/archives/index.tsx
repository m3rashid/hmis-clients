import { Tabs } from 'antd';
import React, { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { toSentenceCase } from '../../helpers/strings';

const ArchiveContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const items = ['consumables', 'non-consumables'];
	const paths = useLocation().pathname.split('/');
	const current = paths[paths.length - 1];
	const navigate = useNavigate();

	return (
		<div>
			<Tabs
				centered
				defaultActiveKey={current}
				onChange={(d) => navigate(`/archives/${d}`)}
				items={items.map((t) => ({ key: t, label: toSentenceCase(t, '-') }))}
			/>
			{children}
		</div>
	);
};

export default ArchiveContainer;
