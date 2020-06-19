import Author from "./author";
import Message from "./message";

import {editDocument} from 'application';
import {root, RootNode} from 'scenegraph';

export default class DocumentModel {
    public messages: Message[] = [];
    public authors: Author[] = [];

    public constructor() {
        this.refresh();

        setInterval(() => this.refresh, 2000);
    }

    public refresh(): void {
        this.messages = root.pluginData?.messages || this.messages;
        this.authors = root.pluginData?.authors || this.authors;
    }

    public update(cb: (model: DocumentModel) => DocumentModel): void {
        this.refresh();
        editDocument((selection: Selection, root: RootNode) => {
            root.pluginData = cb(this);
        });
    }
}
