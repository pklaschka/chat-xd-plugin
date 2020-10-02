import React from 'react';
import { Link } from 'react-router-dom';
import iconBack from '../../../assets/icons/Smock_ArrowLeft_18_N.svg';
import iconSettings from '../../../assets/icons/Smock_Settings_18_N.svg';
import './header.scss';

export function Header({
	title,
	backLink,
	toLink
}: {
	title: string;
	backLink?: string;
	toLink?: string;
}) {
	return (
		<header>
			{backLink && (
				<Link to={backLink}>
					<img height={'1em'} src={iconBack} alt="Go Back" />
				</Link>
			)}
			<h1>{title}</h1>
			<div className="spacer">&nbsp;</div>
			{toLink && (
				<Link to={toLink}>
					<img src={iconSettings} alt="Settings" />
				</Link>
			)}
		</header>
	);
}
