import React from 'react';
import { RefObject } from '../../../hooks/useCustomRef';
import { DialogRef } from './xd-dialog';

/**
 * Props for the {@link XDDialog} component
 */
export interface XDDialogProps<T> {
	submitButtonText?: string;
	submitButtonVariant?: 'cta' | 'warning' | 'action' | 'primary' | 'secondary';

	cancelButtonText?: string;

	customRef: RefObject<DialogRef<T>>;

	initialState: T;

	children: (
		state: T,
		setState: React.Dispatch<React.SetStateAction<T>>
	) => React.ReactNode;
}
