import './react-shim';
import DocumentModel from './model/document/document-model';
import {render} from 'react-dom';
import Chat from './components/chat';
import {Link, MemoryRouter, Route, Switch} from 'react-router-dom';
import localSettings from './model/local/local-settings';
import Author from "./model/document/author";
import {useState} from "react";
import React = require('react');

let panel: HTMLElement | null = null;
let model = new DocumentModel();

function DebugAuthorSetup() {
    const [name, setName] = useState<string>('Pablo');
    const [gravatarMail, setGravatarMail] = useState<string>('contact@pabloklaschka.de');
    return <form style={{background: "white"}}
                 onSubmit={() => localSettings.setAuthor(new Author({name, gravatarMail}))}>
        <input type="text" value={name} onChange={evt => setName(evt.target.value)} name={"name"} placeholder="Name"/>
        <br/>
        <input type="text" value={gravatarMail} onChange={evt => setGravatarMail(evt.target.value)}
               name={"gravatarMail"} placeholder="Gravatar Email"/>
        <br/>

        <button type={"submit"}>Set Author</button>
    </form>;
}

function renderApp() {
    render(
        <MemoryRouter>
            <Switch>
                <Route exact path="/">
                    <p>Test /</p>
                    <p><Link to="/chat">Chat</Link></p>
                    <p>
                        <DebugAuthorSetup />
                    </p>
                    <p>
                        <button onClick={() => localSettings.setAuthor(undefined)}>Unset Author</button>
                    </p>
                    <p>
                        <button onClick={() => model.update((model) => {
                            model.authors = {};
                            model.messages = [];
                            return model;
                        })}>Reset Document
                        </button>
                        {/*<Redirect to={'/chat'}/>*/}
                    </p>
                </Route>
                <Route exact path="/chat">
                    <Chat model={model}/>
                </Route>
            </Switch>
        </MemoryRouter>
        , panel);
}

function create() {
    panel = document.createElement("div");

    return panel;
}

// noinspection JSUnusedGlobalSymbols
const val = {
    panels: {
        'chatPanel': {
            show: (event: any) => {
                if (!panel) event.node.appendChild(create())
            },
            update: () => {
                model.refresh();
                renderApp();
            }
        }
    }
}

export = val;
