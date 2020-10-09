import { md5 } from 'pure-md5';
import React from 'react';
import Author from '../../../model/document/author';

export function Avatar(props: { author: Author }) {
	const hash = md5(props.author.gravatarMail ?? '');
	return (
		<img
			className={'Avatar'}
			alt={`${props.author.name}'s avatar image`}
			width={32}
			src={`https://gravatar.com/avatar/${hash}?s=64&d=mp&r=g`}
		/>
	);
}
