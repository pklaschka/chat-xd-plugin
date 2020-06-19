import uuid from 'v4-uuid';

export default class Author {
    public readonly uuid: string = uuid();
    public name = '';
    public gravatarMail? = '';

    constructor() {
    }
}
