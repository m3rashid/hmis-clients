import { SearchOutlined } from '@ant-design/icons';
import { Input, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import ActionSearchModal from './searchModal';

interface IProps {
	iconOnly?: boolean;
}

const META_KEY = 'shift';
const META_KEY_SYMBOL = <>&#x21E7;</>;

const GlobalSearch: React.FC<IProps> = ({ iconOnly }) => {
	const [isOpen, setOpen] = useState(false);
	const close = () => setOpen(false);
	const open = () => setOpen(true);
	useHotkeys(`${META_KEY}+K`, open, {}, [iconOnly]);

	const icon = (
		<Typography.Text type="secondary">
			<SearchOutlined />
		</Typography.Text>
	);

	const suffix = (
		<div>
			<Typography.Text keyboard type="secondary">
				<span className="text-lg">{META_KEY_SYMBOL}</span>
			</Typography.Text>
			<Typography.Text keyboard type="secondary">
				K
			</Typography.Text>
		</div>
	);

	return (
		<>
			{!iconOnly && (
				<Input
					size="middle"
					prefix={icon}
					onClick={open}
					suffix={suffix}
					style={{
						borderRadius: 8,
						boxShadow: 'none',
						margin: '5px',
						maxWidth: 350,
					}}
					placeholder="Search..."
				/>
			)}

			{iconOnly && (
				<div
					className="all-center"
					role="presentation"
					onClick={open}
					style={{
						margin: '8px 6px',
						padding: '8px 0',
						borderRadius: 8,
					}}
				>
					<Tooltip title={`Press ${META_KEY}+K for fast access`} placement="right">
						{icon}
					</Tooltip>
				</div>
			)}
			<ActionSearchModal isOpen={isOpen} close={close} />
		</>
	);
};

export default GlobalSearch;
