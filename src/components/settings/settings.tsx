import React, { useCallback, useMemo, useRef } from 'react';
import useAsyncRenderer from '../../hooks/useAsyncRenderer';
import useLogger from '../../hooks/useLogger';
import DocumentModel from '../../model/document/document-model';
import LocalSettings from '../../model/local/local-settings';
import { CheckboxSwitch } from '../general-elements/checkbox-switch';
import { Header } from '../general-elements/header/header';
import './settings.scss';
import { SettingsPageFooter } from './settingsPageFooter';

export function SettingsPage(props: { model: DocumentModel }) {
	const logger = useLogger('SettingsPage');

	const authorPromise = useMemo(() => LocalSettings.getAuthor(), []);
	const gravatarPromise = useMemo(() => LocalSettings.getGravatar(), []);

	const allPromise = useMemo(
		() => Promise.all([authorPromise, gravatarPromise]),
		[authorPromise, gravatarPromise]
	);

	const nameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const gravatarInputRef = useRef<HTMLInputElement>(null);

	const save = useCallback(async () => {
		props.model.update(async (model: DocumentModel) => {
			const res = {
				name: nameInputRef.current?.value ?? '',
				email: emailInputRef.current?.value ?? '',
				gravatar: gravatarInputRef.current?.checked ?? false
			};
			logger.info('Saving user settings', res);
			await LocalSettings.setGravatar(res.gravatar);

			await LocalSettings.setAuthor(
				Object.assign(await LocalSettings.getAuthor(), res)
			);

			logger.success('Settings saved successfully');

			const newAuthor = await LocalSettings.getAuthor();
			model.authors[newAuthor.uuid] = newAuthor;

			return model;
		});
	}, [nameInputRef.current, emailInputRef.current, gravatarInputRef.current]);

	return useAsyncRenderer(
		allPromise,
		([author, gravatar]) => {
			return (
				<div className="wrapper SettingsPage">
					<Header title={'Settings'} backLink={'/chat'} />

					<div className="padding-horiz">
						<h1>User Settings</h1>
						<label htmlFor="name">Name:</label>
						<input
							name="name"
							id={'name'}
							type="text"
							defaultValue={author.name}
							ref={nameInputRef}
						/>
						<label htmlFor={'email'}>Gravatar E-Mail Address:</label>
						<input
							name={'email'}
							id={'email'}
							type="text"
							defaultValue={author.gravatarMail}
							ref={emailInputRef}
						/>
						<h1>Privacy</h1>
						<CheckboxSwitch ref={gravatarInputRef} defaultValue={gravatar}>
							Use Gravatar Avatars
						</CheckboxSwitch>
						<div className={'flex'}>
							<div className="spacer">&nbsp;</div>
							<button onClick={save} uxp-variant={'cta'}>
								Save
							</button>
						</div>
						<SettingsPageFooter />
					</div>
				</div>
			);
		},
		(e) => {
			logger.error('Error while loading settings page info:', e);
			return <p>Error</p>;
		}
	);
}
