// <reference "cypress" />
// @ts-ignore
import { mount } from 'cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '../../main.scss';
import '../chat/chat-page.scss';
import { OnboardingPage } from './onboarding-page';

describe('Onboarding component', () => {
	beforeEach(() => {
		mount(
			<MemoryRouter>
				<div className={'wrapper'}>
					<OnboardingPage />
				</div>
			</MemoryRouter>
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
