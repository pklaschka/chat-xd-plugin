// <reference "cypress" />
// @ts-ignore
import { mount } from '@cypress/react';
import React from 'react';
import { MessageEditor } from './message-editor';

describe('MessageEditor', () => {
	it('works', () => {
		mount(
			<MessageEditor
				message={'Hello world'}
				onCancel={() => {}}
				onSubmit={() => {}}
			/>
		);
		cy.screenshot();
	});

	describe('component logic', () => {
		let onSubmit: (newMessage: string) => {}, onCancel: () => {};

		beforeEach(() => {
			onSubmit = cy.stub().as('onSubmit');
			onCancel = cy.stub().as('onCancel');

			mount(
				<MessageEditor
					message={'Hello world'}
					onSubmit={onSubmit}
					onCancel={onCancel}
				/>
			);
		});

		it('submits when pressing "Enter"', () => {
			cy.get('textarea')
				.type('New Text {Enter}')
				.then(() => {
					expect(onSubmit).to.have.been.calledWith('New Text \nHello world');
				});
		});

		it('submits when clicking the checkmark button', () => {
			cy.get('.MessageActions > :nth-child(1)')
				.click()
				.then(() => {
					expect(onSubmit).to.have.been.calledWith('Hello world');
				});
		});

		it('cancels when pressing "Escape"', () => {
			cy.get('textarea')
				.type('New Text {Esc}')
				.then(() => {
					expect(onCancel).to.have.been.called;
				});
		});

		it('submits when clicking the cancel button', () => {
			cy.get('.MessageActions > :nth-child(2)')
				.click()
				.then(() => {
					expect(onCancel).to.have.been.called;
				});
		});
	});
});
