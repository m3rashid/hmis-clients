import React from 'react';
import apiService from '../../api/service';
import { useQuery } from '@tanstack/react-query';
import { Typography } from 'antd';

const Profile: React.FC = () => {
	const query = useQuery({
		queryKey: ['profile'],
		queryFn: apiService('/user/user/me-details', 'GET'),
	});

	if (query.isLoading) {
		return <div>Loading</div>;
	}

	return (
		<>
			<Typography.Text>
				<pre>{JSON.stringify(query.data?.data, null, 2)}</pre>
			</Typography.Text>
		</>
	);
};

export default Profile;
