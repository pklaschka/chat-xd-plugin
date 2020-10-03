import React from 'react';
import packageJSON from '../../../package.json';
import useLogger from '../../hooks/useLogger';
import { Header } from '../general-elements/header/header';
import UserSwitch from '../general-elements/switch';

export function SettingsPage() {
	return (
		<div className="wrapper">
			<Header title={'Settings'} backLink={'/chat'} />
			<h1>User Settings</h1>
			<h1>Privacy</h1>
			<UserSwitch value={true} onChange={() => {}}>
				Use Gravatar Avatars
			</UserSwitch>
			<button
				onClick={() => useLogger('Settings Page').info('Saving settings')}
				uxp-variant={'cta'}>
				Save
			</button>
			<hr />
			<p>CHAT FOR XD: {packageJSON.version.toUpperCase()}</p>
		</div>
	);
}
