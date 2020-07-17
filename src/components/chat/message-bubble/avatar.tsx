import Author from "../../../model/document/author";
import React from "react";
import {md5} from 'pure-md5';

export function Avatar(props: { author: Author }) {
    const hash = md5(props.author.gravatarMail ?? '');
    return <img alt={`${props.author.name}'s avatar image`} width={32}
                src={`https://gravatar.com/avatar/${hash}?s=400&d=robohash&r=x`}/>;
}
