import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { XDDialogProps } from './xd-dialog-props';
import './xd-dialog.scss';

export const CANCELED = Symbol('Canceled');

/**
 * An that gets "filled" into the `customRef` prop passed to a {@link XDDialog}
 * component.
 */
export interface DialogRef<T> {
	/**
	 * Resolves when the dialog gets submitted.
	 *
	 * Resolves with `false` when the dialog gets canceled
	 */
	show(): Promise<T | typeof CANCELED>;
}

/**
 * An element to render a native XD plugin dialog
 *
 * @param props - the props passed to the dialog
 * @returns the rendered {@link JSX.Element}
 * @example
 * ```tsx
 * <XDDialog
 *     customRef={dialogRef}
 *     initialState={true}
 *     submitButtonText={'Delete'}
 *     submitButtonVariant={'warning'}>
 *     {() => (
 *         <>
 *             <h1>Delete message?</h1>
 *             <p>
 *                 Do you really want to delete this message? This cannot be
 *                 undone.
 *             </p>
 *         </>
 *     )}
 * </XDDialog>
 * ```
 */
export function XDDialog<T>(props: XDDialogProps<T>): JSX.Element {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

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
		// @ts-ignore
		dialogRef.current?.close('reasonCanceled');
	};

	useLayoutEffect(() => {
		if (formRef.current) {
			// @ts-ignore
			formRef.current.onsubmit = () => dialogRef.current?.close('ok');
		}
	}, [formRef.current]);

	return (
		<dialog ref={dialogRef} className="Dialog">
			<header>&nbsp;</header>
			<form method="dialog" ref={formRef}>
				{props.children(state, setState)}
				<div className="flex">
					<div className="spacer">&nbsp;</div>
					<button
						type="submit"
						uxp-variant={props.submitButtonVariant ?? 'cta'}
					>
						{props.submitButtonText ?? 'Ok'}
					</button>
					<button
						onClick={onCancel}
						type="reset"
						uxp-variant="primary"
						style={{ marginLeft: '0.25rem' }}
					>
						{props.cancelButtonText ?? 'Cancel'}
					</button>
				</div>
			</form>
		</dialog>
	);
}
