import { editDocument } from 'application';
import { root, RootNode } from 'scenegraph';
import useLogger from '../../hooks/useLogger';
import Author from './author';
import Message from './message';

/**
 * A callback to edit the model.
 *
 * @param model - The current model value
 * @returns the modified model value.
 */
export type EditModelCallback = (
	model: DocumentModel
) => DocumentModel | Promise<DocumentModel>;

const logger = useLogger('Document Model');

/**
 * The document model storing the document's message and author data. Gets
 * stored in the `RootNode`'s `pluginData` field.
 */
export default class DocumentModel {
	/**
	 * the document's messages
	 */
	public messages: Message[] = [];
	/**
	 * the document's authors in a key-value object where the author's `uuid` is
	 * the key
	 */
	public authors: { [uuid: string]: Author } = {};

	public constructor() {
		this.refresh();

		setInterval(() => this.refresh, 2000);
	}

	/**
	 * Refreshes the model data from the document values. If document values
	 * aren't available, the current values get used.
	 *
	 * @example
	 * ```ts
	 * model.refresh();
	 * ```
	 */
	public refresh(): void {
		logger.debug('Refreshing');
		this.messages =
			root.pluginData?.messages.map((obj: any) => new Message(obj)) ||
			this.messages;
		this.authors = root.pluginData?.authors || this.authors;

		logger.debug('Instantiating authors');

		for (const key in this.authors) {
			this.authors[key] = new Author(this.authors[key]);
		}
	}

	/**
	 * Updates the model value stored in the document.
	 *
	 * As this edits the document, it
	 * **can only be called from a supported UI event.**
	 *
	 * calls `require('application').editDocument()`
	 *
	 * @see https://adobexdplatform.com/plugin-docs/reference/core/lifecycle.html#initiating-an-edit-operation-from-panel-ui
	 * @param cb - The callback in which the model value gets edited.
	 * @example
	 * ```ts
	 * documentModel.update(async (orig) => {
	 *     orig.messages.push(new Message({ ... }));
	 *     return orig;
	 * });
	 * ```
	 */
	public update(cb: EditModelCallback): void {
		logger.debug('Updating');
		this.refresh();
		editDocument(async (selection: Selection, root: RootNode) => {
			root.pluginData = await cb(this);
			logger.debug('Update complete');
		});
	}
}
