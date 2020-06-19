import DocumentModel from '../../model/document-model';
import React, { useState, useCallback } from 'react';
import Switch from '../general-elements/switch';
import iconLaunch from '../../assets/icons/Smock_Launch_18_N.svg';
import Message from "../../model/message";

export default function Chat({ model, dialog }: { model: DocumentModel, dialog?: HTMLDialogElement }) {
    const [switchState, setSwitchState] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const onSubmit = useCallback((evt) => {
        evt.preventDefault();

        model.update((model) => {
            model.messages.push(new Message({content: message, authorUUID: 'abc'}));
            return model;
        });
        setMessage('')
    }, [message]);

    return <>
        {/* <pre>
            <code>{JSON.stringify(model, null, 4)}</code>
        </pre> */}
        <img src={iconLaunch} alt="Launch" />
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
