/// <reference types="cypress" />
import mount from 'cypress-react-unit-test';
import React from 'react';
import { Avatar } from './avatar';

describe('Avatar component', () => {
	it('works', () => {
		mount(
			<Avatar
				author={{
					uuid: '',
					gravatarMail: 'xdplugins@pabloklaschka.de',
					name: 'fjowe'
				}}
			/>
		);
		// now use standard Cypress commands
		cy.get('.Avatar')
			.should('be.visible')
			.and((img) => {
				expect((img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
			});
	});
});
