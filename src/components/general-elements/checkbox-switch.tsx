import React, { useEffect, useState } from 'react';
import Switch from './switch';

interface CheckboxSwitchProps {
	onChange?: Function;
	[key: string]: any;
}

export const CheckboxSwitch = React.forwardRef(
	(
		{ onChange, children, defaultValue, ...args }: CheckboxSwitchProps,
		ref: React.Ref<HTMLInputElement>
	) => {
		const [state, setState] = useState(false);

		useEffect(() => {
			setState(defaultValue ?? false);
		}, []);

		return (
			<>
				<Switch
					onChange={(newVal) => {
						onChange && onChange(newVal);
						return setState(newVal);
					}}
					value={state}
					children={children}
				/>
				<input
					type={'checkbox'}
					style={{ display: 'none' }}
					ref={ref}
					checked={state}
				/>
			</>
		);
	}
);
