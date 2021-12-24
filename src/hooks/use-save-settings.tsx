import { RefObject, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentModel from '../model/document/document-model';
import LocalSettings from '../model/local/local-settings';
import useLogger from './useLogger';

/**
 * A hook that manages a function to save local settings, based on refs to
 * uncontrolled inputs.
 *
 * Upon saving, this also returns to the previous page in the React Router stack.
 *
 * @param model - the document model to update the author in the document, as well.
 * @param nameInputRef - the ref to the name input
 * @param emailInputRef - the ref to the email input
 * @param gravatarInputRef - the ref to the Gravatar input
 * @returns a function to save the current values
 * @example
 * ```tsx
 * const ref1 = useRef<HTMLInputElement>(null);
 * const ref2 = useRef<HTMLInputElement>(null);
 * const ref3 = useRef<HTMLInputElement>(null);
 *
 * const save = useSaveSettings(
 *     documentModel,
 *     ref1,
 *     ref2,
 *     ref3
 * )
 *
 * return <>
 *     <input ref={ref1} type="text" />
 *     <input ref={ref2} type="text" />
 *     <input ref={ref3} type="checkbox" />
 *     <button onClick={save}>Save</button>
 *     </>
 * ```
 */
export function useSaveSettings(
	model: DocumentModel,
	nameInputRef: RefObject<HTMLInputElement>,
	emailInputRef: RefObject<HTMLInputElement>,
	gravatarInputRef: RefObject<HTMLInputElement>
): () => Promise<void> {
	const logger = useLogger('useSafeSettings');
	const navigate = useNavigate();

	return useCallback(async () => {
		model.update(async (currentModel: DocumentModel) => {
			// Sanitize inputs
			const res = {
				name: nameInputRef.current?.value ?? '',
				gravatarMail: emailInputRef.current?.value ?? '',
				gravatar: gravatarInputRef.current?.checked ?? false
			};
			logger.info('Saving user settings', res);

			// Save to local settings
			await LocalSettings.setGravatar(res.gravatar);
			await LocalSettings.setAuthor(
				Object.assign(await LocalSettings.getAuthor(), res)
			);
			logger.success('Settings saved successfully');

			// Change the author details in the document
			const newAuthor = await LocalSettings.getAuthor();
			currentModel.authors[newAuthor.uuid] = newAuthor;

			// Return to previous page
			navigate(-1);

			return currentModel;
		});
	}, [nameInputRef.current, emailInputRef.current, gravatarInputRef.current]);
}
