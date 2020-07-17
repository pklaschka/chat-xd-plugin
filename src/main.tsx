import './react-shim';
import DocumentModel from './model/document/document-model';
import {render} from 'react-dom';
import Chat from './components/chat';
import {Link, MemoryRouter, Route, Switch} from 'react-router-dom';
import localSettings from './model/local/local-settings';
import Author from "./model/document/author";
import React = require('react');

let panel: HTMLElement | null = null;
let model = new DocumentModel();

function renderApp() {
    render(
        <MemoryRouter>
            <Switch>
                <Route exact path="/">
                    <p>Test /</p>
                    <p><Link to="/chat">Chat</Link></p>
                    <p>
                        <button onClick={() => localSettings.setAuthor(new Author({name: 'Pablo', gravatarMail: 'contact@pabloklaschka.de'}))}>Set Author</button>
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
