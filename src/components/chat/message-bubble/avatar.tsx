import { md5 } from 'pure-md5';
import React from 'react';
import Author from '../../../model/document/author';
import './avatar.scss';

export function Avatar(props: { author: Author; gravatar: boolean }) {
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
