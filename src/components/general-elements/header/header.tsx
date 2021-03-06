import React from 'react';
import { Link } from 'react-router-dom';
import iconBack from '../../../assets/icons/Smock_ArrowLeft_18_N.png';
import iconSettings from '../../../assets/icons/Smock_Settings_18_N.png';
import './header.scss';

/**
 * The props passed to the {@link Header} component
 */
type HeaderProps = {
	/**
	 * the displayed title
	 */
	title: string;
	/**
	 * the url to which the back button leads.
	 *
	 * The back button gets displayed if `backLink !== undefined`
	 */
	backLink?: string;
	/**
	 * the url to which the "to" button leads.
	 *
	 * The "to" button gets displayed if `toLink !== undefined`
	 */
	toLink?: string;
};

/**
 * A header component for the plugin's panel.
 *
 * @param props - the props passed to the component
 * @returns the rendered {@link JSX.Element}
 * @example
 * ```tsx
 * <Header title="Settings" backLink="/chat" />
 * ```
 */
export function Header(props: HeaderProps): JSX.Element {
	const { title, backLink, toLink } = props;
	return (
		<header className={'flex'}>
			{backLink && (
				<>
					<Link to={backLink} title={'Go back'}>
						<img height={'1em'} src={iconBack} alt="Go Back" />
					</Link>
				</>
			)}
			<h1>{title}</h1>
			<div className="spacer">&nbsp;</div>
			{toLink && (
				<Link to={toLink} title={'Settings'}>
					<img src={iconSettings} alt="Settings" />
				</Link>
			)}
		</header>
	);
}
