import storageHelper from 'xd-storage-helper';
import Author from "../document/author";
import useLogger from "../../hooks/useLogger";
const logger = useLogger('Local Settings');

export default class LocalSettings {
    static async hasAuthor(): Promise<boolean> {
        return (await storageHelper.get('me', undefined)) !== undefined;
    }

    static async getAuthor(): Promise<Author> {
        logger.debug('getAuthor')
        return new Author((await storageHelper.get('me', undefined)));
    }

    static async setAuthor(author?: Author): Promise<void> {
        logger.debug('setAuthor', author);
        return storageHelper.set('me', author);
    }
}
