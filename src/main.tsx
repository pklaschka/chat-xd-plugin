import './react-shim';
import DocumentModel from './model/document/document-model';
import {render} from 'react-dom';
import Chat from './components/chat';
import {MemoryRouter, Redirect, Route, Switch} from 'react-router-dom';
import React = require('react');

let panel: HTMLElement | null = null;
let model = new DocumentModel();

function renderApp() {
    render(
        <MemoryRouter>
            <Switch>
                <Route exact path="/">
                    <p>Test /</p>
                    <Redirect to={'/chat'}/>
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
