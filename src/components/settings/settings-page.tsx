import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocalSettingsPromise } from '../../hooks/use-local-settings-promise';
import { useSaveSettings } from '../../hooks/use-save-settings';
import useAsyncRenderer from '../../hooks/useAsyncRenderer';
import useLogger from '../../hooks/useLogger';
import DocumentModel from '../../model/document/document-model';
import { CheckboxSwitch } from '../general-elements/checkbox-switch';
import { Header } from '../general-elements/header/header';
import { SettingsPageFooter } from './settings-page-footer';
import './settings.scss';

/**
 * Props for the {@link SettingsPage} component
 */
type SettingsPageProps = { model: DocumentModel };

/**
 * A component for a settings page
 *
 * @param props - props passed to the component
 * @returns The rendered {@link JSX.Element}
 * @example
 * ```tsx
 * <Route exact path="/settings">
 *     <SettingsPage model={documentModel} />
 * </Route>
 * ```
 */
export function SettingsPage(props: SettingsPageProps): JSX.Element {
	const logger = useLogger('SettingsPage');
	const allPromise = useLocalSettingsPromise();

	const nameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const gravatarInputRef = useRef<HTMLInputElement>(null);

	const save = useSaveSettings(
		props.model,
		nameInputRef,
		emailInputRef,
		gravatarInputRef
	);

	return useAsyncRenderer(
		allPromise,
		([author, gravatar]) => {
			return (
				<div className="wrapper SettingsPage">
					<Header title={'Settings'} />

					<div className="padding-horiz">
						<h1>User Settings</h1>
						<label htmlFor="name">Name:</label>
						<input
							name="name"
							id={'name'}
							type="text"
							defaultValue={author.name}
							ref={nameInputRef}
							placeholder={'Anonymous'}
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
							<Link to="/chat" style={{ marginLeft: '0.25rem' }}>
								<button uxp-variant="primary">Cancel</button>
							</Link>
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
