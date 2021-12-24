/// <reference types="cypress" />
import { mount } from '@cypress/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import '../../chat/chat-page.scss';
import { Header } from './header';

/**
 * The props passed to the {@link Testbench} component
 */
type TestbenchProps = { children: React.ReactNode };

/**
 * A testbench adding `HashRouter` and `.wrapper` around its `children` for
 * testing the {@link Header} component.
 *
 * @param props - the props passed to the testbench component
 * @returns the rendered {@link JSX.Element}
 * @example
 * ```tsx
 * mount(<Testbench><Header title="ABC" /></Testbench>));
 * ```
 */
function Testbench(props: TestbenchProps): JSX.Element {
	return (
		// <BrowserRouter>
		<HashRouter>
			<div className="wrapper">{props.children}</div>
		</HashRouter>
		// </BrowserRouter>
	);
}

describe('Header', () => {
	it('works', () => {
		mount(
			<Testbench>
				<Header title={'Hello World'} />
			</Testbench>
		);

		cy.contains('Hello World');
	});

	it('renders the settings link', () => {
		mount(
			<Testbench>
				<Header toLink={'/settings'} title={'Hello World'} />
			</Testbench>
		);
		cy.screenshot();

		console.log('hash', cy.location().toString());

		cy.location('hash').should('be.eql', '');

		cy.get('img').click();
		cy.location('hash').should('be.eql', '#/settings');
	});
});
