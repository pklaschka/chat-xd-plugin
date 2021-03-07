/// <reference types="cypress" />
import { mount } from '@cypress/react';
import React from 'react';
import '../chat/chat-page.scss';
import ScrollContainer from './scroll-container';

Cypress.Commands.add('mountScrollContainer', () => {
	const rows: string[] = [];
	for (let i = 0; i < 100; i++) rows.push(`Row ${i}`);
	mount(
		<div className="wrapper">
			<main>
				<ScrollContainer>
					<ul>
						{rows.map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</ScrollContainer>
			</main>
		</div>
	);

	cy.wait(800);
});

describe('Scroll Container component', () => {
	it('works', () => {
		// @ts-ignore
		cy.mountScrollContainer();

		cy.get('.scroll-container')
			.trigger('wheel', {
				deltaY: -8000
			})
			.then(() => {
				cy.screenshot();

				cy.contains('Scroll to bottom')
					.click()
					.then(() => {
						cy.screenshot();
					});
			});
	});

	it('shows the button when not at latest', () => {
		// @ts-ignore
		cy.mountScrollContainer();

		cy.contains('Scroll to bottom').should('not.exist');
		cy.get('.scroll-container').trigger('wheel', {
			deltaY: -400
		});
		cy.contains('Scroll to bottom').click();
	});

	it('caps the scroll positions', () => {
		// @ts-ignore
		cy.mountScrollContainer();

		cy.get('.scroll-container').trigger('wheel', {
			deltaY: -8000
		});

		cy.contains('Row 0').should('be.visible');
		cy.contains('Row 99').should('not.be.visible');

		cy.get('.scroll-container').trigger('wheel', {
			deltaY: 16000
		});

		cy.contains('Row 0').should('not.be.visible');
		cy.contains('Row 99').should('be.visible');
	});
});
