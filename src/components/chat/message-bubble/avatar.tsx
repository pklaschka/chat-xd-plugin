import { md5 } from 'pure-md5';
import React from 'react';
import Author from '../../../model/document/author';
import './avatar.scss';

/**
 * Props for the {@link Avatar} component
 */
interface AvatarProps {
	/**
	 * The author whose avatar should get displayed
	 */
	author: Author;
	/**
	 * Has the user opted into using Gravatar images?
	 */
	gravatar: boolean;
}

/**
 * An avatar/profile picture.
 *
 * Displays either
 * - a Gravatar avatar if `props.gravatar`
 * - a placeholder picture (consisting of the initial letter of the author's name) else
 *
 * @param props
 */
export function Avatar(props: AvatarProps) {
	const hash = md5(props.author.gravatarMail ?? '');
	const initial = props.author.name.charAt(0) || 'A';
	return props.gravatar ? (
		<img
			aria-hidden={true}
			className={'Avatar'}
			alt={`${props.author.name}'s avatar image`}
			width={32}
			src={`https://gravatar.com/avatar/${hash}?s=64&d=mp&r=g`}
		/>
	) : (
		<div className="Avatar PlaceholderAvatar" aria-hidden={true}>
			<span>{initial.toUpperCase()}</span>
		</div>
	);
}
