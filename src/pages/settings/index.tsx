import { Tabs } from 'antd';

import { useGetUi } from '../../recoil/ui';

const Settings = () => {
	const { isMobile } = useGetUi();

	return (
		<>
			<Tabs
				defaultActiveKey="1"
				centered
				tabPosition={isMobile ? 'top' : 'left'}
				style={{
					display: 'flex',
					alignItems: 'stretch',
					justifyContent: 'stretch',
					minHeight: 'calc(100vh - 200px)',
				}}
				items={[]}
			/>
		</>
	);
};

export default Settings;
