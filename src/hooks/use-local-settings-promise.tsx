import { useMemo } from 'react';
import Author from '../model/document/author';
import LocalSettings from '../model/local/local-settings';

/**
 * A hook that gathers all local settings that are required for rendering the
 * {@link SettingsPage}
 *
 * @returns Promise that resolves with all the settings, once loaded
 *
 * @example
 * ```tsx
 * const settingsPromise = useLocalSettingsPromise();
 *
 * const [author, gravatar] = await settingsPromise;
 * ```
 */
export function useLocalSettingsPromise(): Promise<[Author, boolean]> {
	const authorPromise = useMemo(() => LocalSettings.getAuthor(), []);
	const gravatarPromise = useMemo(() => LocalSettings.getGravatar(), []);

	return useMemo(() => Promise.all([authorPromise, gravatarPromise]), [
		authorPromise,
		gravatarPromise
	]);
}
