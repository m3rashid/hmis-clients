import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Modal, Tooltip } from 'antd';
import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from './routes';

interface IOption {
	title: string;
	data: Array<{ name: string; link: string }>;
}

const flattenedRoutes = routes.reduce<IOption['data']>((acc, curr) => {
	// TODO: handle permissions in routes
	const notShowRoutes = ['*', '/metrics'];
	if (curr.showInNav === false || notShowRoutes.includes(curr.link)) return [...acc];
	if (!curr.nestedLinks) {
		return [...acc, { name: curr.label, link: curr.link }];
	}
	return [
		...acc,
		...curr.nestedLinks.reduce<IOption['data']>(
			(nestAcc, nestCurr) => [
				...nestAcc,
				{ name: `${curr.label} - ${nestCurr.label}`, link: nestCurr.link },
			],
			[]
		),
	];
}, []);

interface IProps {
	isOpen: boolean;
	close: () => void;
}

const ActionSearchModal: React.FC<IProps> = ({ close, isOpen }) => {
	const ref = useRef<any>();
	const navigate = useNavigate();
	const [options, setOptions] = useState<IOption[]>([{ title: 'Pages', data: flattenedRoutes }]);

	const handleSearch = debounce(() => {
		/**
		 * get data from routes
		 * TODO: get data from everywhere
		 */

		const searchText = ref.current?.input.value.toLowerCase();
		if (!searchText) {
			setOptions([{ title: 'Pages', data: flattenedRoutes }]);
			return;
		}

		const routeResults = flattenedRoutes.reduce<IOption['data']>((acc, curr) => {
			if (!RegExp(searchText).test(curr.name.toLowerCase())) return acc;
			return [...acc, { link: curr.link, name: curr.name }];
		}, []);

		setOptions([{ title: 'Pages', data: routeResults }]);
	}, 500);

	const onSelect = (key: string) => {
		ref.current.input.value = '';
		navigate(key);
		close();
	};

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => ref.current && ref.current.focus(), 10);
		}
	}, [isOpen]);

	return (
		<Modal footer={null} destroyOnClose closable={false} open={isOpen} onCancel={close}>
			<AutoComplete
				autoFocus
				size="large"
				className="w-full"
				onSelect={onSelect}
				defaultActiveFirstOption={true}
				options={options.map((option) => ({
					label: <span>{option.title}</span>,
					options: option.data.map((data) => ({
						value: data.link,
						label: (
							<div className={`flex justify-between`} onClick={() => navigate(data.link)}>
								{data.name}
							</div>
						),
					})),
				}))}
			>
				<Input
					ref={ref}
					autoFocus
					placeholder="Search . . ."
					onChange={handleSearch}
					className="border-none shadow-none text-[18px]"
					prefix={<SearchOutlined className="text-[24px] mr-3" />}
					suffix={
						<Tooltip title="Press Esc for closing modal">
							<CloseCircleOutlined className="text-[20px] text-gray-400" onClick={close} />
						</Tooltip>
					}
				/>
			</AutoComplete>
		</Modal>
	);
};

export default ActionSearchModal;
