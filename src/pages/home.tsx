import Lottie from 'react-lottie';
import allServices from '../animations/hmis-services.json';
import { featuresData } from '../components/atoms/features';
import { configDefaultState } from '../recoil/config';

const Home = () => {
	return (
		<>
			<div className="bg-white py-20 sm:py-16">
				<div className="isolate mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center sm:gap-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							{configDefaultState.app.fullName}
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							We aim to build world class smart digital hospitals. Connected, reliable and integral
							healthcare softwares for all your needs
						</p>
					</div>

					<Lottie options={{ animationData: allServices }} />
				</div>
			</div>

			<div className="bg-white py-6 sm:py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						<div>
							<h2 className="text-base font-semibold leading-7 text-indigo-600">
								Everything you need
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								All-in-one platform
							</p>
							<p className="mt-6 text-base leading-7 text-gray-600">
								A complete one stop solution for all your hospital needs. Make your hospital digital
								and manage all your hospital needs from one centralized place.
							</p>
						</div>
						<dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
							{featuresData.map((feat) => (
								<div key={feat.key} className="relative pl-9">
									<dt className="font-semibold text-gray-900">
										<feat.icon
											size={24}
											className="absolute left-0 top-1 h-5 w-5 text-indigo-500"
										/>
										{feat.title}
									</dt>
									<dd className="mt-2">{feat.description}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
