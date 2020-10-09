import { useMemo } from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ChatPage } from './components/chat';
import { OnboardingPage } from './components/onboarding/onboarding';
import { SettingsPage } from './components/settings/settings';
import useAsyncRenderer from './hooks/useAsyncRenderer';
import useLogger from './hooks/useLogger';
import './main.scss';
import DocumentModel from './model/document/document-model';
import { default as LocalSettings } from './model/local/local-settings';
import './react-shim';
import React = require('react');

let panel: HTMLElement | null = null;
let model = new DocumentModel();

const logger = useLogger('Plugin');
logger.debug('Plugin loaded');

function IndexPageRedirect() {
	const authorPromise = useMemo(() => LocalSettings.hasAuthor(), []);

	return useAsyncRenderer(
		authorPromise,
		(author) => {
			logger.debug('author', author);
			if (!author) return <Redirect to={'/onboarding'} />;
			else return <Redirect to={'/chat'} />;
		},
		(e) => {
			logger.error('error while trying to determine if an author is set', e);
			return (
				<div className={'wrapper'}>
					<p>
						An unexpected error has occurred. Please reopen the document and try
						again.
					</p>
					<p>If the problem persists, please contact the plugin's author.</p>
				</div>
			);
		}
	);
}

function renderApp() {
	logger.debug('renderApp()');
	render(
		<MemoryRouter>
			<Switch>
				<Route exact path="/">
					{/*<button*/}
					{/*	onClick={() =>*/}
					{/*		model.update((model) => {*/}
					{/*			model.authors = {};*/}
					{/*			model.messages = [];*/}
					{/*			return model;*/}
					{/*		})*/}
					{/*	}>*/}
					{/*	Reset Document*/}
					{/*</button>*/}
					<IndexPageRedirect />
				</Route>
				<Route exact path="/onboarding">
					<div className="wrapper">
						<OnboardingPage />
					</div>
				</Route>
				<Route exact path="/chat">
					<ChatPage model={model} />
				</Route>
				<Route exact path="/settings">
					<SettingsPage model={model} />
				</Route>
			</Switch>
		</MemoryRouter>,
		panel
	);
}

function create() {
	panel = document.createElement('div');
	return panel;
}

// noinspection JSUnusedGlobalSymbols
const val = {
	panels: {
		chatPanel: {
			show: (event: any) => {
				if (!panel) event.node.appendChild(create());
			},
			update: () => {
				model.refresh();
				renderApp();
			}
		}
	}
};

export = val;
