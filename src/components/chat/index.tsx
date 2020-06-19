import DocumentModel from '../../model/document/document-model';
import React, {useState, useCallback, useLayoutEffect} from 'react';
import Switch from '../general-elements/switch';
import iconLaunch from '../../assets/icons/Smock_Launch_18_N.svg';
import Message from "../../model/document/message";
import ChatMessageEditor from "./editor/editor";
import './index.scss'
import ScrollContainer from "../scroll-container/scroll-container";

export default function Chat({model, dialog}: { model: DocumentModel, dialog?: HTMLDialogElement }) {
    const [switchState, setSwitchState] = useState<boolean>(true);

    useLayoutEffect(() => {
        console.log((document.querySelector('.wrapper') || {}).scrollHeight)
    })

    return <div className="wrapper">
        <header>
            <h1>Document Chat</h1>
            <img src={iconLaunch} alt="Launch"/>
        </header>
        <main>
            <ScrollContainer>
                <ul>
                    {model.messages.map((message, index) =>
                        <li key={index}>{message.content} &nbsp;<a onClick={() => {message.scrollTo()}}>Viewport</a></li>
                    )}
                </ul>
            </ScrollContainer>
        </main>
        {/*<Switch onChange={setSwitchState} value={switchState}>My Setting</Switch>*/}
        <footer>
            <ChatMessageEditor model={model}/>
            {dialog &&
            <button onClick={() => dialog.close()}>Close</button>}
        </footer>
    </div>
}
