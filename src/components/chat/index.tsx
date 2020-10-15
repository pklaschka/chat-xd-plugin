import React, { useMemo } from 'react';
import useAsyncRenderer from '../../hooks/useAsyncRenderer';
import useLogger from '../../hooks/useLogger';
import DocumentModel from '../../model/document/document-model';
import LocalSettings from '../../model/local/local-settings';
import { Header } from '../general-elements/header/header';
import ScrollContainer from '../scroll-container/scroll-container';
import ChatMessageEditor from './editor/editor';
import './index.scss';
import { MessageBubble } from './message-bubble/message-bubble';

export function ChatPage({
	model,
	dialog
}: {
	model: DocumentModel;
	dialog?: HTMLDialogElement;
}) {
	const authorPromise = useMemo(() => LocalSettings.getAuthor(), []);
	const gravatarPromise = useMemo(() => LocalSettings.getGravatar(), []);

	const allPromise = useMemo(
		() => Promise.all([authorPromise, gravatarPromise]),
		[authorPromise, gravatarPromise]
	);

	return useAsyncRenderer(
		allPromise,
		([author, gravatar]) => (
			<div className="wrapper">
				<Header title={'Document Chat (Beta)'} toLink={'/settings'} />
				<main>
					<ScrollContainer model={JSON.stringify(model)}>
						<ul>
							{model.messages.map((message, index) => (
								<MessageBubble
									key={index}
									message={message}
									model={model}
									me={author}
									gravatar={gravatar}
								/>
							))}
						</ul>
					</ScrollContainer>
				</main>
				<footer>
					<ChatMessageEditor model={model} />
					{dialog && <button onClick={() => dialog.close()}>Close</button>}
				</footer>
			</div>
		),
		(e) => {
			useLogger('Chat Page').error(e);
			return (
				<div className={'wrapper'}>
					An unexpected error has occurred. Please try reopening the document or
					contact the plugin author.
				</div>
			);
		}
	);
}
