import { Tabs } from 'antd';

import * as configs from './configs';
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
				items={[
					{
						key: '1',
						label: 'App Config',
						children: <configs.App />,
					},
				]}
			/>
		</>
	);
};

export default Settings;
