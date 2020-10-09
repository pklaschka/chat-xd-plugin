/// <reference types="cypress" />
import mount from 'cypress-react-unit-test';
import React from 'react';
import DocumentModel from '../../../model/document/document-model';
import ChatMessageEditor from './editor';

const anyWindow = window as any;

describe('ChatMessageEditor', () => {
	beforeEach(() => {
		anyWindow['storageJSON']._content = `{"me":{"uuid": "me-uuid"}}`;

		anyWindow.scenegraph.root.pluginData = null;
	});

	it('works', () => {
		const model: DocumentModel = {
			messages: [],
			update: cy.stub().as('update'),
			refresh: cy.stub().as('refresh'),
			authors: {}
		};

		mount(<ChatMessageEditor model={model} />);
	});

	it('accepts text inputs', () => {
		mount(<ChatMessageEditor model={new DocumentModel()} />);
		cy.get('textarea').type('Hello world{shift}{enter}Second line');
	});

	it(`shouldn't submit empty text`, () => {
		const model: DocumentModel = {
			messages: [],
			update: cy.stub().as('update'),
			refresh: cy.stub().as('refresh'),
			authors: {}
		};
		mount(<ChatMessageEditor model={model} />);
		cy.get('textarea')
			.type('{enter}')
			.then(() => {
				expect(model.update).to.not.have.been.called;
			});
	});

	it(`should submit upon pressing enter`, () => {
		const model: DocumentModel = {
			messages: [],
			update: cy.stub().as('update'),
			refresh: cy.stub().as('refresh'),
			authors: {}
		};
		mount(<ChatMessageEditor model={model} />);
		cy.get('textarea')
			.type('Hello world{enter}')
			.then(() => {
				expect(model.update).to.have.been.called;
			});
	});

	it(`should submit with the correct data`, () => {
		mount(<ChatMessageEditor model={new DocumentModel()} />);
		cy.get('textarea')
			.type('Hello world{enter}')
			.then(() => {
				expect(anyWindow.scenegraph.root.pluginData).to.exist;
				expect(anyWindow.scenegraph.root.pluginData.messages).to.have.length(1);
				expect(
					anyWindow.scenegraph.root.pluginData.messages[0].authorUUID
				).to.eq('me-uuid');
			});

		cy.log(anyWindow.scenegraph);
	});
});
