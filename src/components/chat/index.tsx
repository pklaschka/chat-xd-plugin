import DocumentModel from '../../model/document/document-model';
import React, {useEffect} from 'react';
import iconCrosshair from '../../assets/icons/Smock_Crosshairs_18_N.svg';
import ChatMessageEditor from "./editor/editor";
import './index.scss'
import ScrollContainer from "../scroll-container/scroll-container";
import {useLocation} from 'react-router-dom';

export default function Chat({model, dialog}: { model: DocumentModel, dialog?: HTMLDialogElement }) {
    const location = useLocation();

    useEffect(() => console.log(location), [location]);

    return <div className="wrapper">
            <header>
                <h1>Document Chat</h1>
                {/*<button onClick={() => console.log('Chat plugin data: ', model)}><img src={iconLaunch} alt="Launch"/>*/}
                {/*</button>*/}
            </header>
            <main>
                <ScrollContainer>
                    <ul>
                        {model.messages.map((message, index) =>
                            <li key={index}>{message.content} <br/>&nbsp;<a onClick={() => {
                                message.scrollTo()
                            }}>
                                <img src={iconCrosshair} alt={'Viewport location'}/>
                            </a></li>
                        )}
                    </ul>
                </ScrollContainer>
            </main>
            <footer>
                <ChatMessageEditor model={model}/>
                {dialog &&
                <button onClick={() => dialog.close()}>Close</button>}
            </footer>
    </div>
}
