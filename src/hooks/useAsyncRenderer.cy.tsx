// <reference "cypress" />
// @ts-ignore
import { mount, mountHook } from 'cypress-react-unit-test';
import React from 'react';
import useAsyncRenderer from './useAsyncRenderer';

describe('useAsyncRenderer', () => {
	let resolve: Function;
	let reject: Function;

	it('works', () => {
		mountHook(() =>
			useAsyncRenderer<any>(
				new Promise((res, rej) => {
					resolve = res;
					reject = rej;
				}),
				(res) => <p>{res}</p>,
				(reason) => <p>Error: {reason}</p>
			)
		).then((res: any) => {
			cy.log('before', res.current);
			resolve(true);
			cy.log('after', res.current);
		});
	});

	it('resolves', () => {
		const promise = new Promise((resolve1) => (resolve = resolve1));

		mount(<Testbench promise={promise} />);

		cy.contains('Loading').then(() => {
			resolve(true);
		});
		cy.get('code').contains('true');
	});

	it('rejects', () => {
		const promise = new Promise((resolve1, reject1) => (reject = reject1));

		mount(<Testbench promise={promise} />);

		cy.contains('Loading').then(() => {
			reject('Hello World');
		});
		cy.get('code').contains('Error: Hello World');
	});
});

function Testbench(props: { promise: Promise<any> }) {
	return useAsyncRenderer(
		props.promise,
		(res) => <code>Resolved: {res.toString()}</code>,
		(reason) => <code>Error: {reason.toString()}</code>
	);
}
