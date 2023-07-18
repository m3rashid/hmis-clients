import { Fragment } from 'react';
import { Image, Typography } from 'antd';
import { featuresData } from '../components/atoms/features';
import { configDefaultState, useGetConfig } from '../recoil/config';
import UploadSelector from '../components/upload/selector';

const Home = () => {
	const config = useGetConfig();
	const isDark = config.theme.mode === 'dark';

	return (
		<Fragment>
			<div className={`${isDark ? '' : 'bg-white'} py-20 sm:py-40`}>
				<div className="isolate mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center sm:gap-8">
					<div className="text-center">
						<Typography.Title className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							{configDefaultState.app.fullName}
						</Typography.Title>
						<Typography.Text
							className={`mt-6 text-lg leading-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
						>
							We aim to build world class smart digital hospitals. Connected, reliable and integral
							healthcare softwares for all your needs
						</Typography.Text>
					</div>

					<Image preview={false} src="/images/hospital.png" />
				</div>
			</div>

			<UploadSelector />

			<div className={`${isDark ? '' : 'bg-white'} py-6 sm:py-16`}>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						<div>
							<Typography.Title
								level={3}
								className={`text-base font-semibold leading-7 ${
									isDark ? 'text-gray-400' : 'text-gray-600'
								}`}
							>
								Everything you need
							</Typography.Title>
							<Typography.Text
								className={`mt-2 text-3xl font-bold tracking-tight ${
									isDark ? 'text-gray-100' : 'text-gray-900'
								} sm:text-4xl`}
							>
								All-in-one platform
							</Typography.Text>

							<br />
							<br />

							<Typography.Text
								className={`mt-6 text-base leading-7 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
							>
								A complete one stop solution for all your hospital needs. Make your hospital digital
								and manage all your hospital needs from one centralized place.
							</Typography.Text>
						</div>
						<dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
							{featuresData.map((feat) => (
								<div key={feat.key} className="relative pl-9">
									<dt className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
										<feat.icon
											size={24}
											className="absolute left-0 top-1 h-5 w-5 text-indigo-500"
										/>
										<Typography.Text className={`${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
											{feat.title}
										</Typography.Text>
									</dt>

									<dd className="mt-2">
										<Typography.Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
											{feat.description}
										</Typography.Text>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
