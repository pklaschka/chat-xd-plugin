import React from 'react';
import packageJSON from '../../../package.json';

export function SettingsPageFooter() {
	return (
		<>
			<hr />
			<p>DOCUMENT CHAT: {packageJSON.version.toUpperCase()}</p>
			<p>
				Developed by Pablo Klaschka. Source code is available on&nbsp;
				<a
					title="https://github.com/pklaschka/chat-xd-plugin"
					href="https://github.com/pklaschka/chat-xd-plugin">
					GitHub
				</a>
				.
			</p>
			<p>
				<a
					href={'https://xdplugins.pabloklaschka.de/privacy'}
					title={'https://xdplugins.pabloklaschka.de/privacy'}>
					Privacy Policy
				</a>
			</p>
		</>
	);
}
