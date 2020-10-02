import uuid from 'v4-uuid';

/**
 * An author of a message
 *
 * Every plugin user is an author. Messages by an author get associated with that
 * author by the author's UUID.
 */
export default class Author {
	/**
	 * A unique uuid for the user to assign messages to users when parsing data
	 */
	public readonly uuid: string = uuid();
	/**
	 * the author's display name. If empty, this should get replaced with 'Anonymous'
	 */
	public name = '';
	/**
	 * the author's gravatar email address. Can be empty
	 */
	public gravatarMail? = '';

	constructor(object: any = {}) {
		this.uuid = object['uuid'] ?? this.uuid;
		this.name = object['name'] ?? this.name;
		this.gravatarMail = object['gravatarMail'] ?? this.gravatarMail;
	}
}
