/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		mountScrollContainer(): void;
		mountMessageBubble(
			message: string,
			ownMessage?: boolean,
			gravatar?: boolean
		): void;
	}
}
