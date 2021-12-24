import { useMemo } from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChatPage } from './components/chat/chat-page';
import { OnboardingPage } from './components/onboarding/onboarding-page';
import { SettingsPage } from './components/settings/settings-page';
import useAsyncRenderer from './hooks/useAsyncRenderer';
import useLogger from './hooks/useLogger';
import './main.scss';
import DocumentModel from './model/document/document-model';
import { default as LocalSettings } from './model/local/local-settings';
import './react-shim';
import React = require('react');

let panel: HTMLElement | null = null;
const model = new DocumentModel();

const logger = useLogger('Plugin');
logger.debug('Plugin loaded');

/**
 * Redirects to the chat if the author is set (i.e., the installation is ready
 * to go) or to the onboarding if no author data is stored in the local settings
 *
 * @returns the redirect component, or, in case of an error, an error message
 * @example
 * ```ts
 * <Route path="/">
 *     <IndexPageRedirect />
 * </Route>
 * ```
 */
function IndexPageRedirect(): JSX.Element {
	const authorPromise = useMemo(() => LocalSettings.hasAuthor(), []);

	return useAsyncRenderer(
		authorPromise,
		(author) => {
			logger.debug('author', author);
			if (!author) return <Navigate to={'/onboarding'} />;
			else return <Navigate to={'/chat'} />;
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

/**
 * Renders the app into the panel wrapper using `react-dom`
 *
 * @example
 * ```ts
 * model.refresh(); // refresh the model from document metadata
 * renderApp(); // re-render the app, based on the new data
 * ```
 */
function renderApp(): void {
	logger.debug('renderApp()');
	render(
		<MemoryRouter>
			<Routes>
				<Route path="/">
					<Route index element={<IndexPageRedirect />} />
					<Route
						path="onboarding"
						element={
							<div className="wrapper">
								<OnboardingPage />
							</div>
						}
					/>
					<Route path="chat" element={<ChatPage model={model} />} />
					<Route path="settings" element={<SettingsPage model={model} />} />
				</Route>
			</Routes>
		</MemoryRouter>,
		panel
	);
}

/**
 * Creates the panel wrapper element
 *
 * @returns the panel wrapper element
 * @example
 * ```ts
 * show(evt) { evt.node.appendChild(create()); }
 * ```
 */
function create(): HTMLElement {
	panel = document.createElement('div');
	return panel;
}

/**
 * The definition for the main chat panel
 */
const chatPanel: PanelDefinition = {
	show: (event: ShowPanelEvent) => {
		if (!panel) event.node.appendChild(create());
	},
	update: () => {
		model.refresh();
		renderApp();
	}
};

export const panels: Record<string, PanelDefinition> = {
	chatPanel
};
