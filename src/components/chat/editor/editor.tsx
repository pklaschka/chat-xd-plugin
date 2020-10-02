import React, { useCallback, useEffect, useState } from 'react';
import DocumentModel from '../../../model/document/document-model';
import Message from '../../../model/document/message';
import localSettings from '../../../model/local/local-settings';
import './editor.scss';
import { Redirect } from 'react-router-dom';
import useLogger from '../../../hooks/useLogger';

/**
 * State of the editor component. This determines whether it's ready to chat based on whether the author data is set up.
 */
enum LoadedState {
	/**
	 * Loading state: Checking whether the app is ready to chat
	 */
	LOADING,
	/**
	 * No author has been set up => Redirect to setup
	 */
	NO_AUTHOR,
	/**
	 * Author is set up => ready to chat
	 */
	READY
}

const logger = useLogger('Chat Message Editor');

export default function ChatMessageEditor({ model }: { model: DocumentModel }) {
	const [message, setMessage] = useState<string>('');
	const [loadedState, setLoadedState] = useState<LoadedState>(
		LoadedState.LOADING
	);

	/**
	 * Update/add author data to document and append current message
	 */
	const onSubmit = useCallback(
		(evt) => {
			logger.debug('Submitting message');
			evt.preventDefault();

			model.update(async (model) => {
				const author = await localSettings.getAuthor();

				// Add or update author profile data in document data
				model.authors[author.uuid] = author;

				model.messages.push(
					new Message({ content: message, authorUUID: author.uuid })
				);
				return model;
			});
			setMessage('');
		},
		[message]
	);

	/**
	 * Check whether the author data is set up locally:
	 */
	useEffect(() => {
		localSettings.hasAuthor().then((hasAuthor) => {
			setLoadedState(hasAuthor ? LoadedState.READY : LoadedState.NO_AUTHOR);
		});
	});

	switch (loadedState) {
		case LoadedState.LOADING:
			return <p>Loading...</p>;
		case LoadedState.READY:
			return (
				<form onSubmit={onSubmit} className={'chat-message-editor'}>
					<label htmlFor={'message'}>New message (Enter to send):</label>
					<br />
					<input
						uxp-quiet={'true'}
						autoFocus={true}
						id={'message'}
						value={message}
						onChange={(evt) => setMessage(evt.target.value)}
						type="text"
						name="message"
						placeholder="Message"
						required
					/>
				</form>
			);
		default:
			return <Redirect to={'/'} />;
	}
}
