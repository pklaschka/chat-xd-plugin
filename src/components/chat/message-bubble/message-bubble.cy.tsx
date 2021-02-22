// <reference "cypress" />
// @ts-ignore
import { mount } from 'cypress-react-unit-test';
import React from 'react';
import '../../../main.scss';
import Author from '../../../model/document/author';
import DocumentModel from '../../../model/document/document-model';
import Message from '../../../model/document/message';
import '../chat.scss';
import { MessageBubble } from './message-bubble';

const anyWindow: any = window;

Cypress.Commands.add(
	'mountMessageBubble',
	(message: string, ownMessage: boolean = true, gravatar: boolean = true) => {
		const author1 = new Author({
			name: 'Jane Doe',
			gravatarMail: 'jane@doe.com'
		});

		const author2 = new Author({
			name: 'John Other',
			gravatarMail: 'john@other.com'
		});

		const message1 = new Message({
			content: message,
			authorUUID: ownMessage ? author1.uuid : author2.uuid,
			date: 1602238046221,
			viewportCenter: {
				x: 10,
				y: 10,
				width: 50,
				height: 50
			}
		});

		anyWindow.scenegraph.root.pluginData = {
			messages: [],
			authors: {}
		};

		anyWindow.scenegraph.root.pluginData.authors[author1.uuid] = author1;
		anyWindow.scenegraph.root.pluginData.authors[author2.uuid] = author2;
		anyWindow.scenegraph.root.pluginData.messages.push(message1);

		const model = new DocumentModel();
		model.refresh();

		cy.log('model', model);

		mount(
			<div className="wrapper">
				<main style={{ margin: '0 0.75rem' }}>
					<ul>
						<MessageBubble
							message={message1}
							model={model}
							me={author1}
							gravatar={gravatar}
						/>
					</ul>
				</main>
			</div>
		);
	}
);

describe('Message Bubble Component', () => {
	beforeEach(() => {});

	it('works', () => {
		// @ts-ignore
		cy.mountMessageBubble('Hello World', true);
		cy.screenshot();
		// @ts-ignore
		cy.mountMessageBubble('Hello World', false);
		cy.screenshot();
		// @ts-ignore
		cy.mountMessageBubble('Hello World', true, false);
		cy.screenshot();
		// @ts-ignore
		cy.mountMessageBubble('Hello World', false, false);
		cy.screenshot();
	});

	describe('markdown rendering', () => {
		afterEach(() => {
			cy.screenshot();
		});

		it('renders normal messages', () => {
			// @ts-ignore
			cy.mountMessageBubble('Hello World', false, false);
		});

		describe('inline styles', () => {
			it('renders bold text', () => {
				// @ts-ignore
				cy.mountMessageBubble('**Bold Text**', true, false);

				cy.get('.MessageContent').within(() =>
					cy.get('strong').should('exist')
				);
			});
			it('renders italic text', () => {
				// @ts-ignore
				cy.mountMessageBubble('_Italic Text_', true, false);

				cy.get('.MessageContent').within(() => cy.get('em').should('exist'));
			});
			it('renders code', () => {
				// @ts-ignore
				cy.mountMessageBubble('`Code`', true, false);

				cy.get('.MessageContent').within(() => cy.get('code').should('exist'));
			});
			it('renders links', () => {
				// @ts-ignore
				cy.mountMessageBubble(
					'https://xdplugins.pabloklaschka.de',
					true,
					false
				);
				cy.get('.MessageContent').within(() =>
					cy
						.get('a')
						.contains('https://xdplugins.pabloklaschka.de')
						.should('exist')
						.and('have.attr', 'href', 'https://xdplugins.pabloklaschka.de')
				);
			});
			it('renders links with a link label', () => {
				// @ts-ignore
				cy.mountMessageBubble(
					'[Link](https://xdplugins.pabloklaschka.de)',
					true,
					false
				);
				cy.get('.MessageContent').within(() =>
					cy
						.get('a')
						.contains('Link')
						.should('exist')
						.and('have.attr', 'href', 'https://xdplugins.pabloklaschka.de')
				);
			});
		});

		describe('block styles', () => {
			it('renders multiple paragraphs', () => {
				// @ts-ignore
				cy.mountMessageBubble(
					'First paragraph\n\nSecond paragraph',
					true,
					false
				);

				cy.get('.MessageContent').children('p').should('have.length', 2);
			});

			it('ignores single line breaks', () => {
				// @ts-ignore
				cy.mountMessageBubble('First paragraph\nSame paragraph', true, false);

				cy.get('.MessageContent').children('p').should('have.length', 1);
			});

			it(`renders block code blocks`, () => {
				// @ts-ignore
				cy.mountMessageBubble('```js\nconsole.log(a);\n```', true, false);

				cy.get('.MessageContent').within(() => {
					cy.get('pre').should('be.visible');
				});
			});
		});

		describe('forbidden elements', () => {
			it(`doesn't render image elements`, () => {
				// @ts-ignore
				cy.mountMessageBubble(
					'![Image](https://xdplugins.pabloklaschka.de/media/img/icon_192.png)',
					true,
					false
				);

				cy.get('.MessageContent').within(() => {
					cy.get('img').should('not.exist');
				});
			});
		});

		describe('typography', () => {
			it('replaces quotes', () => {
				// @ts-ignore
				cy.mountMessageBubble('"Hello World"', true, false);

				cy.get('.MessageContent').should('contain', '“Hello World”');
			});

			it('supports emojis', () => {
				// @ts-ignore
				cy.mountMessageBubble(':tada: :)', true, false);

				cy.get('.MessageContent').should('contain', '🎉').and('contain', '😃');
			});
		});
	});

	describe('message deletion', () => {
		it('only allows deletion on own messages', () => {
			// @ts-ignore
			cy.mountMessageBubble('Hello World', true, false);
			cy.get('[title="Delete message"]').should('be.visible');

			// @ts-ignore
			cy.mountMessageBubble('Hello World', false, false);
			cy.get('[title="Delete message"]').should('not.exist');
		});

		describe('deleting a message', () => {
			beforeEach(() => {
				// @ts-ignore
				cy.mountMessageBubble('Hello World', true, false);

				cy.get('[title="Delete message"]').click();
			});
			it('opens a confirmation window before deleting the message', () => {
				cy.get('dialog').should('be.visible');
				cy.screenshot();
			});

			it('does nothing when the deletion dialog gets canceled', () => {
				expect(anyWindow.scenegraph.root.pluginData.messages.length).to.equal(
					1
				);
				const before = JSON.stringify(anyWindow.scenegraph.root);
				cy.contains('Cancel')
					.click()
					.then(() => {
						const after = JSON.stringify(anyWindow.scenegraph.root);

						expect(before).to.equal(after);
						expect(
							anyWindow.scenegraph.root.pluginData.messages.length
						).to.equal(1);
					});
			});

			it('deletes the message when the dialog gets confirmed', () => {
				expect(anyWindow.scenegraph.root.pluginData.messages.length).to.equal(
					1
				);
				const before = JSON.stringify(anyWindow.scenegraph.root);
				cy.get('[type="submit"]')
					.click()
					.then(() => {
						const after = JSON.stringify(anyWindow.scenegraph.root);

						expect(before).not.to.equal(after);
						expect(
							anyWindow.scenegraph.root.pluginData.messages.length
						).to.equal(0);
					});
			});
		});
	});

	describe('viewport scrolling', () => {
		beforeEach(() => {
			anyWindow.viewport.scrollToCenter = cy
				.stub()
				.as('viewport.scrollToCenter()');

			// @ts-ignore
			cy.mountMessageBubble('Hello World', false, false);
		});
		it('calls viewport.scrollToCenter() when the button is clicked', () => {
			cy.get('[title="Go to viewport position"]')
				.click()
				.then(() => {
					expect(anyWindow.viewport.scrollToCenter).to.have.been.calledWith(
						35,
						35
					);
				});
		});
	});
});
