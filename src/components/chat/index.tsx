import DocumentModel from '../../model/document/document-model';
import React, { useEffect } from 'react';
import ChatMessageEditor from './editor/editor';
import './index.scss';
import ScrollContainer from '../scroll-container/scroll-container';
import { useLocation } from 'react-router-dom';
import { Header } from '../general-elements/header/header';
import MessageBubble from './message-bubble/message-bubble';

export default function Chat({
	model,
	dialog
}: {
	model: DocumentModel;
	dialog?: HTMLDialogElement;
}) {
	const location = useLocation();

	return (
		<div className="wrapper">
			<Header title={'Document Chat (Beta)'} toLink={'/settings'} />
			<main>
				<ScrollContainer model={JSON.stringify(model)}>
					<ul>
						{model.messages.map((message, index) => (
							<MessageBubble key={index} message={message} model={model} />
						))}
					</ul>
				</ScrollContainer>
			</main>
			<footer>
				<ChatMessageEditor model={model} />
				{dialog && <button onClick={() => dialog.close()}>Close</button>}
			</footer>
		</div>
	);
}
