// <reference "cypress" />
// @ts-ignore
import { mount } from 'cypress-react-unit-test';
import React from 'react';
import '../../main.scss';
import '../chat/chat.scss';
import { OnboardingPage } from './onboarding';

describe('Onboarding component', () => {
	beforeEach(() => {
		mount(
			<div className={'wrapper'}>
				<OnboardingPage />
			</div>
		);
	});

	afterEach(() => {
		// Clean up the local settings model
		// @ts-ignore
		window.storageJSON._content = '';
	});

	it('works', () => {
		cy.contains(`Let's do it`).should('be.visible');
	});

	it('renders every screen', () => {
		for (let i = 0; i < 4; i++) {
			cy.screenshot();
			cy.get('[uxp-variant="cta"]').click();
		}
		cy.screenshot();
		cy.get('[uxp-variant="cta"]').should('be.disabled');
		cy.contains('I have read').click();
		cy.screenshot();
		cy.get('[uxp-variant="cta"]').click();
		cy.contains('Loading the plugin').should('be.visible');
	});
});
