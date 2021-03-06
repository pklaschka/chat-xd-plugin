import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import React, { useMemo, useState } from 'react';
import { FormattedRelativeTime, IntlProvider } from 'react-intl';
import { useCustomRef } from '../../../hooks/useCustomRef';
import Author from '../../../model/document/author';
import DocumentModel from '../../../model/document/document-model';
import Message from '../../../model/document/message';
import {
	CANCELED,
	DialogRef,
	XDDialog
} from '../../general-elements/xd-dialog/xd-dialog';
import { Avatar } from './avatar';
import './message-bubble.scss';
import { MessageEditor } from './message-editor';
import { MessageViewer } from './message-viewer';

const parser = new MarkdownIt({
	linkify: true,
	typographer: true
})
	.use(emoji)
	.disable('image');

/**
 * The parameters for the {@link MessageBubble} component
 */
interface MessageBubbleParams {
	/**
	 * The message displayed by the {@link MessageBubble}
	 */
	message: Message;
	/**
	 * The document model in which manipulations can take place
	 */
	model: DocumentModel;
	/**
	 * The current user. If `me.uuid === message.authorUUID`, additional options for own messages are available
	 */
	me: Author;
	/**
	 * Whether the Gravatar avatars should gets used
	 */
	gravatar: boolean;
}

/**
 * The state of the message bubble
 */
enum MessageBubbleState {
	/**
	 * "Normal" state: Just viewing the message
	 */
	NORMAL,
	/**
	 * Editing state: Shows editor to edit one's own messages
	 */
	EDITING
}

/**
 * A message bubble for a single message
 *
 * @param props
 */
export function MessageBubble(props: MessageBubbleParams) {
	const [state, setState] = useState(MessageBubbleState.NORMAL);

	const { content, date, authorUUID } = props.message;

	const contentHTML = useMemo(() => parser.render(content), [content]);
	const ownMessage = useMemo(() => props.me.uuid === authorUUID, [authorUUID]);

	const onDelete = () =>
		props.model.update(async (model) => {
			if ((await dialogRef.current?.show()) !== CANCELED) {
				const index = model.messages.findIndex(
					(value) => value.uuid === props.message.uuid
				);

				if (index >= 0) model.messages.splice(index, 1);
			}

			return model;
		});

	const onEdit = (newMessage: string) =>
		props.model.update(async (model) => {
			const index = model.messages.findIndex(
				(value) => value.uuid === props.message.uuid
			);

			if (index >= 0) model.messages[index].content = newMessage.trim();

			setState(MessageBubbleState.NORMAL);

			return model;
		});

	const dialogRef = useCustomRef<DialogRef<boolean>>(null);

	return (
		<li className="MessageBubble">
			<IntlProvider locale={'en'}>
				<Avatar
					gravatar={props.gravatar}
					author={props.model.authors[authorUUID]}
				/>
				<h4>
					{props.model.authors[authorUUID].name || 'Anonymous'}
					&nbsp;&ndash;&nbsp;
					<FormattedRelativeTime
						value={(date - Date.now()) / 1000}
						unit={'second'}
						numeric="auto"
						updateIntervalInSeconds={10}
					/>
				</h4>
				{state === MessageBubbleState.NORMAL && (
					<MessageViewer
						html={contentHTML}
						ownMessage={ownMessage}
						onEdit={() => setState(MessageBubbleState.EDITING)}
						onGoToViewport={() => props.message.scrollTo()}
						onDelete={onDelete}
					/>
				)}
				{state === MessageBubbleState.EDITING && (
					<MessageEditor
						onSubmit={onEdit}
						onCancel={() => setState(MessageBubbleState.NORMAL)}
						message={props.message.content}
					/>
				)}
				<XDDialog
					customRef={dialogRef}
					initialState={true}
					submitButtonText={'Delete'}
					submitButtonVariant={'warning'}>
					{() => (
						<>
							<h1>Delete message?</h1>
							<p>
								Do you really want to delete this message? This cannot be
								undone.
							</p>
						</>
					)}
				</XDDialog>
			</IntlProvider>
		</li>
	);
}
