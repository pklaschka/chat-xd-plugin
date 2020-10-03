import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/polyfill';
import React, { useCallback, useMemo } from 'react';
import { FormattedRelativeTime, IntlProvider } from 'react-intl';
import iconCrosshair from '../../../assets/icons/Smock_Crosshairs_18_N.svg';
import iconDelete from '../../../assets/icons/Smock_Delete_18_N.svg';
import Author from '../../../model/document/author';
import DocumentModel from '../../../model/document/document-model';
import Message from '../../../model/document/message';
import { Avatar } from './avatar';
import './message-bubble.scss';

interface MessageBubbleParams {
	message: Message;
	model: DocumentModel;
	me: Author;
	gravatar: boolean;
}

export default function MessageBubble(props: MessageBubbleParams) {
	const { content, date, authorUUID } = props.message;

	const ownMessage = useMemo(() => props.me.uuid === authorUUID, [authorUUID]);

	const deleteMessage = useCallback(
		() =>
			props.model.update((model) => {
				const index = model.messages.findIndex(
					(value) => value.uuid === props.message.uuid
				);
				if (index >= 0) model.messages.splice(index, 1);

				return model;
			}),
		[props.model]
	);

	return (
		<li className="MessageBubble">
			<IntlProvider locale={'en'}>
				{props.gravatar && <Avatar author={props.model.authors[authorUUID]} />}
				<h4>
					{props.model.authors[authorUUID].name}
					&nbsp;&ndash;&nbsp;
					<FormattedRelativeTime
						value={(date - Date.now()) / 1000}
						unit={'second'}
						numeric="auto"
						updateIntervalInSeconds={10}
					/>
				</h4>
				<p>{content}</p>
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
			</IntlProvider>
		</li>
	);
}
