/// <reference types="cypress" />
import { mount } from 'cypress/react';
import React from 'react';
import Switch from './switch';

describe('Switch', () => {
	it('works', () => {
		mount(
			<Switch
				onChange={() => {
					/* NoOp */
				}}
				value={true}
			>
				Hello World
			</Switch>
		);

		cy.contains('Hello World');
	});

	it('reacts correctly when unchecked', () => {
		const onChange = cy.stub().as('onChange');
		mount(
			<Switch onChange={onChange} value={false}>
				Hello World
			</Switch>
		);
		cy.screenshot();
		cy.get('.switch')
			.click()
			.then(() => {
				expect(onChange).to.have.been.calledWith(true);
			});
	});

	it('reacts correctly when checked', () => {
		const onChange = cy.stub().as('onChange');
		mount(
			<Switch onChange={onChange} value={true}>
				Hello World
			</Switch>
		);
		cy.screenshot();
		cy.get('.switch')
			.click()
			.then(() => {
				expect(onChange).to.have.been.calledWith(false);
			});
	});
});
