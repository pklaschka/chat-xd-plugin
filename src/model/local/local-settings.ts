import storageHelper from 'xd-storage-helper';
import Author from "../document/author";

export default class LocalSettings {
    static async hasAuthor(): Promise<boolean> {
        return (await storageHelper.get('me', undefined)) !== undefined;
    }

    static async getAuthor(): Promise<Author> {
        return new Author((await storageHelper.get('me', undefined)));
    }

    static async setAuthor(author?: Author): Promise<void> {
        return storageHelper.set('me', author);
    }
}
