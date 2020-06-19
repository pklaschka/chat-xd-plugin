import React, {useCallback, useState} from 'react';
import DocumentModel from "../../../model/document/document-model";
import Message from "../../../model/document/message";
import './editor.scss';

export default function ChatMessageEditor({model}: { model: DocumentModel }) {
    const [message, setMessage] = useState<string>('');

    const onSubmit = useCallback((evt) => {
        evt.preventDefault();

        model.update((model) => {
            model.messages.push(new Message({content: message, authorUUID: 'abc'}));
            return model;
        });
        setMessage('')
    }, [message]);

    return (
        <form onSubmit={onSubmit} className={'chat-message-editor'}>
            <label htmlFor={'message'}>New message (Enter to send):</label><br />
            <input uxp-quiet={'true'} autoFocus={true} id={'message'} value={message} onChange={(evt) => setMessage(evt.target.value)} type="text"
                   name="message" placeholder="Message" required />
        </form>
    );
}
