/// <reference types="cypress" />
import mount from 'cypress-react-unit-test';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import '../../chat/index.scss';
import { Header } from './header';

function Parent(props: { children: React.ReactNode }) {
	return (
		// <BrowserRouter>
		<HashRouter>
			<div className="wrapper">{props.children}</div>
		</HashRouter>
		// </BrowserRouter>
	);
}

describe('Header', () => {
	it('works', () => {
		mount(
			<Parent>
				<Header title={'Hello World'} />
			</Parent>
		);

		cy.contains('Hello World');
	});

	it('renders the settings link', () => {
		mount(
			<Parent>
				<Header toLink={'/settings'} title={'Hello World'} />
			</Parent>
		);
		cy.screenshot();

		cy.location().hash().should('be.eql', '#/');

		cy.get('img').click();
		cy.location().hash().should('be.eql', '#/settings');
	});
});
