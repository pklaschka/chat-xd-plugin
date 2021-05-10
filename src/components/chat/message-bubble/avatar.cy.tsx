/// <reference types="cypress" />
import { mount } from '@cypress/react';
import React from 'react';
import { Avatar } from './avatar';

const user = {
	uuid: '',
	gravatarMail: 'xdplugins@pabloklaschka.de',
	name: 'John Doe'
};

describe('Avatar component', () => {
	it('works', () => {
		mount(<Avatar gravatar={true} author={user} />);
		// now use standard Cypress commands
		cy.get('.Avatar')
			.should('be.visible')
			.and((img) => {
				expect((img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
			});
	});

	it('uses Gravatar avatars with gravatar={true}', () => {
		mount(<Avatar gravatar={true} author={user} />);

		cy.get('img.Avatar').should('exist');
		cy.screenshot();
	});

	describe('placeholder avatar', () => {
		beforeEach(() => {
			mount(<Avatar gravatar={false} author={user} />);
		});

		it('use placeholder avatars with gravatar={false}', () => {
			cy.get('img.Avatar').should('not.exist');
			cy.screenshot();
		});

		it('should use "A" as initial if the author\'s name is empty', () => {
			mount(
				<Avatar gravatar={false} author={Object.assign(user, { name: '' })} />
			);

			cy.get('.Avatar').should('contain', 'A');
		});
	});
});
