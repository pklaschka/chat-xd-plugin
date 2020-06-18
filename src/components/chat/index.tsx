import DocumentModel from '../../model/document-model';
import React, { useState, useCallback } from 'react';
import Switch from '../general-elements/switch';

export default function Chat({ model, dialog }: { model: DocumentModel, dialog?: HTMLDialogElement }) {
    const [switchState, setSwitchState] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const onSubmit = useCallback((evt) => {
        evt.preventDefault();

        model.update((model) => {
            model.messages.push({ authorGUID: 'abc', content: message });
            return model;
        });
        setMessage('')
    }, [message]);

    return <>
        {/* <pre>
            <code>{JSON.stringify(model, null, 4)}</code>
        </pre> */}
        <ul>
            {model.messages.map((message, index) =>
                <li key={index}>{message.content}</li>
            )}
        </ul>
        <Switch onChange={setSwitchState} value={switchState}>My Setting</Switch>
        <form onSubmit={onSubmit}>
            <input autoFocus={true} value={message} onChange={(evt) => setMessage(evt.target.value)} type="text" name="message" />
            <button onClick={onSubmit}>Send</button>
        </form>
        {dialog &&
            <button onClick={() => dialog.close()}>Close</button>}
    </>
}