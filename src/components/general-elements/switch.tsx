import React from 'react';
import './switch.scss';

/**
 * Props for the {@link Switch} component
 */
type SwitchProps = {
	onChange: (newVal: boolean) => void;
	value: boolean;
	children: React.ReactNode;
};

/**
 * A simple switch that abides the Adobe Spectrum Design system
 *
 * @param props - the component's props
 * @returns the rendered {@link JSX.Element}
 * @example
 * ```tsx
 * <Switch onChange={setValue} value={value}>Test</Switch>
 * ```
 */
export default function Switch(props: SwitchProps): JSX.Element {
	const { onChange, value, children } = props;
	return (
		<div
			className={`switch ${value ? 'active' : ''}`}
			onClick={() => onChange(!value)}
		>
			<span className="switch-outer">
				<span className="switch-inner" />
			</span>
			<span className="switch-label label">{children}</span>
		</div>
	);
}
