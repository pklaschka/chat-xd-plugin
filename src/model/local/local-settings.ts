import storageHelper from 'xd-storage-helper';
import useLogger from '../../hooks/useLogger';
import Author from '../document/author';
const logger = useLogger('Local Settings');

/**
 * A class containing static functions to manage locally stored plugin settings
 *
 * Uses {@link storageHelper} to store the settings locally.
 */
export default class LocalSettings {
	/**
	 * Checks if the local author configuration is set.
	 *
	 * @returns `Promise` that resolves to `true` if the local configuration has
	 * the author data set, i.e., is "ready to go"
	 * @example
	 * ```ts
	 * if (! await LocalSettings.hasAuthor())
	 *     showOnboarding();
	 * ```
	 */
	static async hasAuthor(): Promise<boolean> {
		return (await storageHelper.get('me', undefined)) !== undefined;
	}

	/**
	 * Fetches the local author configuration
	 *
	 * @returns `Promise` that resolves to the {@link Author} configuration.
	 * @example
	 * ```ts
	 * const author = await LocalSettings.getAuthor();
	 * ```
	 */
	static async getAuthor(): Promise<Author> {
		logger.debug('getAuthor');
		return new Author(await storageHelper.get('me', undefined));
	}

	/**
	 * Updates the local author configuration
	 *
	 * @param author - the new author object
	 * @returns Promise that resolves when the author configuration was saved.
	 * @example
	 * ```ts
	 * await LocalSettings.setAuthor(new Author())
	 * ```
	 */
	static async setAuthor(author?: Author): Promise<void> {
		logger.debug('setAuthor', author);
		return storageHelper.set('me', author);
	}

	/**
	 * Updates whether or not to show Gravatar avatars.
	 *
	 * @param gravatar - `true` to show, `false` to hide Gravatar avatars
	 * @returns Promise that resolves when the setting was saved.
	 * @example
	 * ```ts
	 * await LocalSettings.setGravatar(false);
	 * ```
	 */
	static async setGravatar(gravatar: boolean): Promise<void> {
		logger.debug('setGravatar', gravatar);
		return storageHelper.set('gravatar', gravatar);
	}

	/**
	 * Fetches whether the user wants to show Gravatar avatars
	 *
	 * @returns `Promise` that resolves to `true` if the user wishes to show
	 * avatars and `false` they don't.
	 * @example
	 * ```ts
	 * const isGravatarEnabled = await LocalSettings.getGravatar();
	 * ```
	 */
	static async getGravatar(): Promise<boolean> {
		return storageHelper.get('gravatar', false);
	}
}
