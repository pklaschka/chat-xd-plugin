/// <reference types="cypress" />
// @ts-ignore
import { mount } from 'cypress-react-unit-test';
import React from 'react';
import { RefObject, useCustomRef } from '../../hooks/useCustomRef';
import { CANCELED, DialogRef, XDDialog } from './dialog';

function Parent<T>(props: {
	children: (dialogRef: RefObject<DialogRef<T>>) => React.ReactNode;
	onResult?: (result: T | typeof CANCELED) => void;
}) {
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
					}>
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
			<Parent>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Parent>
		);
		cy.get('#cy-open-dialog').click();

		cy.contains('Hello world').should('be.visible');
		cy.contains('Ok').should('be.visible');
		cy.contains('Cancel').should('be.visible');
	});

	it('shows the dialog when show() gets called', () => {
		mount(
			<Parent>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Parent>
		);
		cy.get('dialog').should('not.be.visible');
		cy.get('#cy-open-dialog').click();

		cy.get('dialog').should('be.visible');
	});

	it('cancels the dialog correctly', () => {
		const onResult = cy.stub().log().as('onResult');

		mount(
			<Parent onResult={onResult}>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Parent>
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
			<Parent onResult={onResult}>
				{(dialogRef) => (
					<XDDialog customRef={dialogRef} initialState={3}>
						{() => <h1>Hello world</h1>}
					</XDDialog>
				)}
			</Parent>
		);
		cy.get('#cy-open-dialog').click();
		cy.contains('Ok')
			.click()
			.then(() => {
				expect(onResult).to.have.calledWith(3);
			});
	});
});
