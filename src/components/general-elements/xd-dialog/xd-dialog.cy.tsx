/// <reference types="cypress" />
import { mount } from 'cypress/react';
import React from 'react';
import { RefObject, useCustomRef } from '../../../hooks/useCustomRef';
import { CANCELED, DialogRef, XDDialog } from './xd-dialog';

/**
 * Props passed to the {@link Testbench} component
 */
type TestbenchProps<T> = {
	children: (dialogRef: RefObject<DialogRef<T>>) => React.ReactNode;
	onResult?: (result: T | typeof CANCELED) => void;
};

/**
 * A testbench component for testing the {@link XDDialog} component
 *
 * @param props - the props passed to the component
 * @returns the rendered {@link JSX.Element}
 * @example
 * ```tsx
 * mount(
 *     <Testbench>
 *         {(dialogRef) => (
 *             <XDDialog customRef={dialogRef} initialState={3}>
 *                 {() => <h1>Hello world</h1>}
 *             </XDDialog>
 *         )}
 *     </Testbench>
 * );
 * ```
 */
function Testbench<T>(props: TestbenchProps<T>): JSX.Element {
	const dialogRef = useCustomRef<DialogRef<T>>(null);

	return (
		<>
			<header>
				<button
					id={'cy-open-dialog'}
					onClick={() =>
						dialogRef.current
							?.show()
							.then((res) => props.onResult && props.onResult(res))
					}
				>
					Show Dialog
				</button>
			</header>
			<main>{props.children(dialogRef)}</main>
		</>
	);
}

describe('Dialog component', () => {
	it('works', () => {
		mount(
			<Testbench>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Testbench>
		);
		cy.get('#cy-open-dialog').click();

		cy.contains('Hello world').should('be.visible');
		cy.contains('Ok').should('be.visible');
		cy.contains('Cancel').should('be.visible');
	});

	it('shows the dialog when show() gets called', () => {
		mount(
			<Testbench>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Testbench>
		);
		cy.get('dialog').should('not.be.visible');
		cy.get('#cy-open-dialog').click();

		cy.get('dialog').should('be.visible');
	});

	it('cancels the dialog correctly', () => {
		const onResult = cy.stub().log().as('onResult');

		mount(
			<Testbench onResult={onResult}>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Testbench>
		);
		cy.get('#cy-open-dialog').click();
		cy.contains('Cancel')
			.click()
			.then(() => {
				expect(onResult).to.have.calledWith(CANCELED);
			});
	});

	it('submits the dialog correctly', () => {
		const onResult = cy.stub().log().as('onResult');

		mount(
			<Testbench onResult={onResult}>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Testbench>
		);
		cy.get('#cy-open-dialog').click();
		cy.contains('Ok')
			.click()
			.then(() => {
				expect(onResult).to.have.calledWith(3);
			});
	});
});
