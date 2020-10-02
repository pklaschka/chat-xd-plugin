import React from 'react';
import './switch.scss';

export default function Switch({
	onChange,
	value,
	children
}: {
	onChange: (newVal: boolean) => void;
	value: boolean;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`switch ${value ? 'active' : ''}`}
			onClick={() => onChange(!value)}>
			<span className="switch-outer">
				<span className="switch-inner"></span>
			</span>
			<span className="switch-label label">{children}</span>
		</div>
	);
}
