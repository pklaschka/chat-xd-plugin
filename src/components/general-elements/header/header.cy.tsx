/// <reference types="cypress" />
import mount from 'cypress-react-unit-test';
import React from 'react';
import '../../chat/index.scss';
import { Header } from './header';

function Parent(props: { children: React.ReactNode }) {
	return (
		// <BrowserRouter>
		<div className="wrapper">{props.children}</div>
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
});
