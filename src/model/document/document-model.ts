import Author from "./author";
import Message from "./message";

import {editDocument} from 'application';
import {root, RootNode} from 'scenegraph';

/**
 * A callback to edit the model.
 * @param model The current model value
 * @returns the modified model value.
 */
export type EditModelCallback = (model: DocumentModel) => DocumentModel | Promise<DocumentModel>;

/**
 * The document model storing the document's message and author data. Gets stored in the `RootNode`'s `pluginData` field.
 */
export default class DocumentModel {
    public messages: Message[] = [];
    public authors: { [uuid: string]: Author } = {};

    public constructor() {
        this.refresh();

        setInterval(() => this.refresh, 2000);
    }

    /**
     * Refreshes the model data from the document values. If document values aren't available, the current values get used.
     */
    public refresh(): void {
        this.messages = root.pluginData?.messages.map((obj: any) => new Message(obj)) || this.messages;
        this.authors = root.pluginData?.authors || this.authors;

        for (let key in this.authors) {
            this.authors[key] = new Author(this.authors[key]);
        }
    }

    /**
     * Updates the model value stored in the document. As this edits the document, it **can only be called from a supported UI event.**
     *
     * @see https://adobexdplatform.com/plugin-docs/reference/core/lifecycle.html#initiating-an-edit-operation-from-panel-ui
     * @param cb The callback in which the model value gets edited.
     */
    public update(cb: EditModelCallback): void {
        this.refresh();
        editDocument(async (selection: Selection, root: RootNode) => {
            root.pluginData = await cb(this);
        });
    }
}
