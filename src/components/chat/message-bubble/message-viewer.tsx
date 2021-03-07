import React from 'react';
import iconCrosshair from '../../../assets/icons/Smock_Crosshairs_18_N.png';
import iconDelete from '../../../assets/icons/Smock_Delete_18_N.png';
import iconEdit from '../../../assets/icons/Smock_Edit_18_N.png';

/**
 * Props for the {@link MessageViewer} component
 */
interface MessageViewerProps {
	/**
	 * the message's content as HTML
	 */
	html: string;
	/**
	 * Callback for scrolling to the message's viewport position
	 */
	onGoToViewport: () => void;
	/**
	 * is this the current user's own message?
	 */
	ownMessage: boolean;
	/**
	 * Callback for when the edit button gets pressed
	 */
	onEdit: () => void;
	/**
	 * Callback for when the delete button gets pressed
	 */
	onDelete: () => void;
}

/**
 * A viewer for the messages. Displays additional actions for own messages
 *
 * @param props - the props for the component
 * @returns the rendered {@link JSX.Element}
 *
 * @example
 * ```tsx
 * <li className="MessageBubble">
 *     [...]
 *     <MessageViewer [...] />
 *	</li>
 * ```
 */
export function MessageViewer(props: MessageViewerProps): JSX.Element {
	return (
		<>
			<div
				className="MessageContent"
				dangerouslySetInnerHTML={{ __html: props.html }}
			/>
			<p className={'MessageActions'}>
				<button
					uxp-variant={'action'}
					onClick={props.onGoToViewport}
					title={'Go to viewport position'}>
					<img src={iconCrosshair} alt={'Go to viewport position'} />
				</button>
				{props.ownMessage && (
					<>
						&nbsp;
						<button
							uxp-variant={'action'}
							onClick={props.onEdit}
							title={'Edit message'}>
							<img src={iconEdit} alt={'Edit message'} />
						</button>
						&nbsp;
						<button
							uxp-variant={'action'}
							onClick={props.onDelete}
							title={'Delete message'}>
							<img src={iconDelete} alt={'Delete message'} />
						</button>
					</>
				)}
			</p>
		</>
	);
}
