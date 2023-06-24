import { Tabs } from 'antd';
import React, { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toSentenceCase } from '../../helpers/strings';

const PatientManagementContainer: React.FC<PropsWithChildren> = ({ children }) => {
	const items = ['home', 'appointments', 'in-patient', 'out-patient'];
	const paths = useLocation().pathname.split('/');
	const current = paths[paths.length - 1];
	const navigate = useNavigate();

	return (
		<div>
			<Tabs
				centered
				defaultActiveKey={current}
				onChange={(d) => navigate(`/patient/${d}`)}
				items={items.map((t) => ({ key: t, label: toSentenceCase(t, '-') }))}
			/>
			{children}
		</div>
	);
};

export default PatientManagementContainer;
