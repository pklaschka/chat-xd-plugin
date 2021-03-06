import React, { useEffect, useState } from 'react';
import Switch from './switch';

/**
 * Props passed to the {@link CheckboxSwitch} component
 */
interface CheckboxSwitchProps {
	onChange?: (newValue: boolean) => void;
	[key: string]: any;
}

/**
 * A Switch component that uses an `<input type="checkbox" ref={ref} />` under
 * the hood so that it can easily be used as an uncontrolled component
 */
export const CheckboxSwitch = React.forwardRef(
	(
		{ onChange, children, defaultValue }: CheckboxSwitchProps,
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
