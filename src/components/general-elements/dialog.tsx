import React, { useEffect, useRef, useState } from 'react';
import { XDDialogProps } from './XDDialogProps';

export const CANCELED = Symbol('Canceled');

export interface DialogRef<T> {
	/**
	 * Resolves when the dialog gets submitted.
	 *
	 * Resolves with `false` when the dialog gets canceled
	 */
	show(): Promise<T | typeof CANCELED>;
}

export function XDDialog<T>(props: XDDialogProps<T>) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		props.customRef.updateRef({
			show: async () => {
				// @ts-ignore
				if ((await dialogRef.current?.showModal()) === 'reasonCanceled') {
					return CANCELED;
				} else {
					return state;
				}
			}
		});

		return () => props.customRef.updateRef(null);
	}, []);

	const [state, setState] = useState<T>(props.initialState);

	const onCancel = () => {
		dialogRef.current?.close('reasonCanceled');
	};

	return (
		<dialog ref={dialogRef}>
			<form method="dialog">
				{props.children(state, setState)}
				<div className="flex">
					<div className="spacer">&nbsp;</div>
					<button
						type="submit"
						uxp-variant={props.submitButtonVariant ?? 'cta'}>
						{props.submitButtonText ?? 'Ok'}
					</button>
					<button
						onClick={onCancel}
						type="reset"
						uxp-variant="primary"
						style={{ marginLeft: '0.25rem' }}>
						{props.cancelButtonText ?? 'Cancel'}
					</button>
				</div>
			</form>
		</dialog>
	);
}
