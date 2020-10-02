import uuid from 'v4-uuid';
import useLogger from '../../hooks/useLogger';

export default class Author {
	public readonly uuid: string = uuid();
	public name = '';
	public gravatarMail? = '';

	constructor(object: any = {}) {
		this.uuid = object['uuid'] ?? this.uuid;
		this.name = object['name'] ?? this.name;
		this.gravatarMail = object['gravatarMail'] ?? this.gravatarMail;
	}
}
