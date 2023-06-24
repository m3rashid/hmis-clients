import React, { useEffect } from 'react'
import apiService from '../../api/service';

interface IProps {}

const Profile: React.FC<IProps> = () => {
	const getProfile = apiService('/user//me-details');

	useEffect(() => {
		getProfile().then(console.log).catch(console.log);
	}, [])

	return (
		<>
			<div>Profile</div>
		</>
	);
}

export default Profile
