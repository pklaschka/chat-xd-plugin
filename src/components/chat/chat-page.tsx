import React from 'react';
import { useLocalSettingsPromise } from '../../hooks/use-local-settings-promise';
import useAsyncRenderer from '../../hooks/useAsyncRenderer';
import useLogger from '../../hooks/useLogger';
import DocumentModel from '../../model/document/document-model';
import { Header } from '../general-elements/header/header';
import ScrollContainer from '../scroll-container/scroll-container';
import './chat-page.scss';
import ChatMessageEditor from './editor/editor';
import { MessageBubble } from './message-bubble/message-bubble';

/**
 * The props for the {@link ChatPage} component
 */
type ChatPageProps = {
	model: DocumentModel;
};

/**
 * The chat page component
 *
 * @param props - the props
 * @returns the rendered {@link JSX.Element}
 * @example
 * ```tsx
 * <Route exact path="/chat">
 *     <ChatPage model={documentModel} dialog={dialogElement} />
 * </Route>
 * ```
 */
export function ChatPage(props: ChatPageProps): JSX.Element {
	const allPromise = useLocalSettingsPromise();

	return useAsyncRenderer(
		allPromise,
		([author, gravatar]) => (
			<div className="wrapper">
				<Header title={'Document Chat (Beta)'} toLink={'/settings'} />
				<main>
					<ScrollContainer>
						<ul>
							{props.model.messages.map((message, index) => (
								<MessageBubble
									key={index}
									message={message}
									model={props.model}
									me={author}
									gravatar={gravatar}
								/>
							))}
						</ul>
					</ScrollContainer>
				</main>
				<footer>
					<ChatMessageEditor model={props.model} />
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
