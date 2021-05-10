/// <reference types="cypress" />
import { mount } from '@cypress/react';
import React from 'react';
import { CheckboxSwitch } from './checkbox-switch';

describe('Checkbox Switch', () => {
	it('works', () => {
		mount(<CheckboxSwitch defaultValue={false}>Test</CheckboxSwitch>);
		cy.contains('Test');
	});
	it('calls props.onChange', () => {
		const onChange = cy.stub().as('onChange');

		mount(
			<CheckboxSwitch onChange={onChange} defaultValue={false}>
				Test
			</CheckboxSwitch>
		);
		// now use standard Cypress commands

		cy.get('.switch')
			.click()
			.then(() => {
				expect(onChange).to.have.been.calledWith(true);
			});
		cy.get('.switch')
			.click()
			.then(() => {
				expect(onChange).to.have.been.calledWith(false);
			});
	});
	it('forwards the ref to the checkbox', () => {
		const ref = React.createRef<HTMLInputElement>();

		mount(
			<CheckboxSwitch ref={ref} defaultValue={false}>
				Test
			</CheckboxSwitch>
		).then(() => {
			expect(ref).to.have.property('current');
			expect(ref.current?.checked).to.be.false;
		});
		// now use standard Cypress commands

		cy.get('.switch')
			.click()
			.then(() => {
				expect(ref.current?.checked).to.be.true;
			});
		cy.get('.switch')
			.click()
			.then(() => {
				expect(ref.current?.checked).to.be.false;
			});
	});
});
