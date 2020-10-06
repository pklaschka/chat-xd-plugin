import React from 'react';
import { RefObject } from '../../hooks/useCustomRef';
import { DialogRef } from './dialog';

export interface XDDialogProps<T> {
	submitButtonText?: string;
	submitButtonVariant?: 'cta' | 'warning' | 'action' | 'primary' | 'secondary';

	cancelButtonText?: string;

	customRef: RefObject<DialogRef<T>>;

	initialState: T;

	children: (state: T, setState: (state: T) => void) => React.ReactNode;
}
