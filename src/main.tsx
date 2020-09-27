import './react-shim';
import DocumentModel from './model/document/document-model';
import {render} from 'react-dom';
import Chat from './components/chat';
import {Link, MemoryRouter, Redirect, Route, Switch} from 'react-router-dom';
import localSettings from './model/local/local-settings';
import Author from "./model/document/author";
import {useState} from "react";
import React = require('react');
import {Header} from "./components/general-elements/header/header";
import useLogger from "./hooks/useLogger";
import packageJSON from '../package.json';
import UserSwitch from './components/general-elements/switch';
import Onboarding from "./components/onboarding";

let panel: HTMLElement | null = null;
let model = new DocumentModel();

function DebugAuthorSetup() {
    const [name, setName] = useState<string>('Pablo');
    const [gravatarMail, setGravatarMail] = useState<string>('contact@pabloklaschka.de');
    return <form
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
                        <Redirect to={'/onboarding'}/>
                    </p>
                </Route>
                <Route exact path="/onboarding">
                    <div className="wrapper">
                        <Onboarding/>
                    </div>
                </Route>
                <Route exact path="/chat">
                    <Chat model={model}/>
                </Route>
                <Route exact path="/settings">
                    <div className="wrapper">
                        <Header title={'Settings'} backLink={'/chat'} />
                        <h1>User Settings</h1>
                        <DebugAuthorSetup />
                        <h1>Privacy</h1>
                        <UserSwitch value={true} onChange={() => {}}>Use Gravatar Avatars</UserSwitch>
                        <button onClick={() => useLogger('Settings Page').info('Saving settings')} uxp-variant={'cta'}>Save</button>
                        <hr />
                        <p>CHAT FOR XD: {packageJSON.version.toUpperCase()}</p>
                    </div>
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
