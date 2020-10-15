import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import React, { useMemo } from 'react';
import { FormattedRelativeTime, IntlProvider } from 'react-intl';
import iconCrosshair from '../../../assets/icons/Smock_Crosshairs_18_N.svg';
import iconDelete from '../../../assets/icons/Smock_Delete_18_N.svg';
import { useCustomRef } from '../../../hooks/useCustomRef';
import Author from '../../../model/document/author';
import DocumentModel from '../../../model/document/document-model';
import Message from '../../../model/document/message';
import { CANCELED, DialogRef, XDDialog } from '../../general-elements/dialog';
import { Avatar } from './avatar';
import './message-bubble.scss';

const parser = new MarkdownIt({
	linkify: true,
	typographer: true
})
	.use(emoji)
	.disable('image');

interface MessageBubbleParams {
	message: Message;
	model: DocumentModel;
	me: Author;
	gravatar: boolean;
}

export default function MessageBubble(props: MessageBubbleParams) {
	// const logger = useLogger('MessageBubble:' + props.message.uuid);
	const { content, date, authorUUID } = props.message;

	const contentHTML = useMemo(() => parser.render(content), [content]);

	const ownMessage = useMemo(() => props.me.uuid === authorUUID, [authorUUID]);

	const deleteMessage = () =>
		props.model.update(async (model) => {
			if ((await dialogRef.current?.show()) !== CANCELED) {
				const index = model.messages.findIndex(
					(value) => value.uuid === props.message.uuid
				);

				if (index >= 0) model.messages.splice(index, 1);
			}

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
				<div
					className="MessageContent"
					dangerouslySetInnerHTML={{ __html: contentHTML }}
				/>
				<p>
					<a
						onClick={() => props.message.scrollTo()}
						title={'Go to viewport position'}>
						<img src={iconCrosshair} alt={'Go to viewport position'} />
					</a>
					&nbsp;
					{ownMessage && (
						<a onClick={deleteMessage} title={'Delete message'}>
							<img src={iconDelete} alt={'Delete message'} />
						</a>
					)}
				</p>
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
