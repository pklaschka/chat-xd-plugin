import './react-shim';
import DocumentModel from './model/document-model';
import { render } from 'react-dom';
import Chat from './components/chat';
import React = require('react');

let panel: HTMLElement | null = null;
let model = new DocumentModel();

function create() {
    panel = document.createElement("div");
    render(<Chat model={model} />, panel);

    return panel;
}

const val = {
    panels: {
        'chatPanel': {
            show: (event: any) => {
                if (!panel) event.node.appendChild(create())
            },
            update: () => {
                model.refresh();
                render(<Chat model={model} />, panel);
            }
        }
    }
}

export = val;