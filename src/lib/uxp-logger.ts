import { LogFunctionFactory } from '@fliegwerk/logsemts/build/types/LogFunctionFactory';
import uxp from 'uxp';

const fs = uxp.storage.localFileSystem;

let messages: string[] = [];

export const UXPLogger: LogFunctionFactory = () => {
	return (type, style, componentName, componentStyle, ...args) => {
		messages.push(
			`[ ${new Date().toISOString()} ]\t[ ${type} ]\t[ ${componentName} ]\t${args
				.map((a) => a.toString())
				.join(' ')}`
		);
	};
};

(async () => {
	const folder = await fs.getDataFolder();

	let file: uxp.storage.File | uxp.storage.Folder;

	try {
		file = await folder.getEntry('log.tsv');
	} catch (e) {
		file = await folder.createFile('log.tsv', {
			overwrite: true
		});
	}

	if (file!.isFile) {
		await file.write(
			`\r\n[ ${new Date().toISOString()} ]\t[ META ]\t[ NEW SESSION ]\tn/a`,
			{
				// @ts-ignore
				append: true
			}
		);

		setInterval(async () => {
			if (file.isFile && messages.length) {
				const messagesToWrite = messages.filter((s) => s.trim().length);
				messages = [];

				await file.write(`\r\n${messagesToWrite.join('\r\n')}`, {
					format: uxp.storage.formats.utf8,
					// @ts-ignore
					append: true
				});
			}
		}, 500);
	}
})();
