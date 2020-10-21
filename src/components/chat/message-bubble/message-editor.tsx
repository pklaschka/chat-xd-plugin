import React, { useCallback, useState } from 'react';
import checkmarkIcon from '../../../assets/icons/Smock_Checkmark_18_N.png';
import cancelIcon from '../../../assets/icons/Smock_Close_18_N.png';
import useLogger from '../../../hooks/useLogger';

/**
 * Props for the {@link MessageEditor} component
 */
interface MessageEditorProps {
	/**
	 * Callback for when the edited message gets submitted
	 * @param newMessage the new, modified message, with trimmed whitespace at the beginning and end
	 */
	onSubmit: (newMessage: string) => void;
	/**
	 * Callback for canceling the editing mode
	 */
	onCancel: () => void;
	/**
	 * The "original" message content (before any edits took place)
	 */
	message: string;
}

/**
 * An editor for the messages inside the {@link MessageBubble}
 * @param props
 *
 * @example ```
 * <li className="MessageBubble">
 *     [...]
 *     <MessageEditor [...] />
 *	</li>
 * ```
 */
export function MessageEditor(props: MessageEditorProps) {
	const [value, setValue] = useState(props.message);

	const onSubmit = useCallback(() => {
		if (value.trim().length) {
			useLogger('MessageEditor').debug('onSubmit', value);
			props.onSubmit(value.trim());
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
			if (e.key === 'Escape') {
				e.stopPropagation();
				e.preventDefault();
			}
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
					<img src={checkmarkIcon} alt={'Confirm edits'} />
				</button>
				<button uxp-variant={'action'} onClick={onCancel}>
					<img src={cancelIcon} alt={'Cancel'} />
				</button>
			</p>
		</>
	);
}
