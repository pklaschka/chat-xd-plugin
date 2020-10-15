import React, { useCallback, useState } from 'react';
import useLogger from '../../../hooks/useLogger';

interface MessageEditorProps {
	onSubmit: (newMessage: string) => void;
	onCancel: () => void;
	message: string;
}

export function MessageEditor(props: MessageEditorProps) {
	const [value, setValue] = useState(props.message);

	const onSubmit = useCallback(() => {
		if (value.trim().length) {
			useLogger('MessageEditor').debug('onSubmit', value);
			props.onSubmit(value);
		}
	}, [props.onSubmit, value]);

	const onCancel = useCallback(() => {
		useLogger('MessageEditor').debug('onCancel');
		props.onCancel();
	}, [props.onSubmit, value]);

	const onKeyUp = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			e.stopPropagation();
			e.preventDefault();
			if (e.key === 'Enter' && !e.shiftKey) {
				onSubmit();
			} else if (e.key === 'Escape') {
				onCancel();
			}
		},
		[onSubmit]
	);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			e.stopPropagation();
			e.preventDefault();
		},
		[]
	);

	return (
		<>
			<textarea
				value={value}
				autoFocus={true}
				uxp-quiet={'true'}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
			/>
			<p className="MessageActions">
				<button
					uxp-variant={'action'}
					onClick={onSubmit}
					disabled={!value.trim().length}>
					Ok
				</button>
				<button uxp-variant={'action'} onClick={onCancel}>
					Cancel
				</button>
			</p>
		</>
	);
}
