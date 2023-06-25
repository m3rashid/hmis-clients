import React from 'react';
import apiService from '../../api/service';
import { useQuery } from '@tanstack/react-query';

const Profile: React.FC = () => {
	const query = useQuery({
		queryKey: ['profile'],
		queryFn: apiService('/user/me-details', 'GET'),
	});

	if (query.isLoading) {
		return <div>Loading</div>;
	}

	return (
		<>
			<div>Profile</div>
			<pre>{JSON.stringify(query.data?.data, null, 2)}</pre>
		</>
	);
};

export default Profile;
