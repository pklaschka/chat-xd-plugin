import { LogFunctionFactory } from '@fliegwerk/logsemts/build/types/LogFunctionFactory';
import uxp from 'uxp';

const fs = uxp.storage.localFileSystem;

let messages: string[] = [];

/**
 * A {@link LogFunctionFactory} for a UXP-plugin-specific log function
 *
 * @returns A `LogFunction` that, periodically, saves
 * messages to a file in the plugin's data folder.
 *
 * @example
 * ```ts
 * import { Logger, PlainLogger, WebhookLogger } from '@fliegwerk/logsemts';
 * const logger = new Logger({
 *     loggers: [ UXPLogger() ]
 * });
 * ```
 */
export const UXPLogger: LogFunctionFactory = () => {
	return (type, style, componentName, componentStyle, ...args) => {
		// [1] Push the message to the messages.
		// In the code below (at [2]), they will get stored into the file
		// periodically.
		messages.push(
			`[ ${new Date().toISOString()} ]\t[ ${type} ]\t[ ${componentName} ]\t${args
				.map((a) => a.toString())
				.join(' ')}`
		);
	};
};

// [2] Periodically save the messages from [1] to the file:
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

	if (file.isFile) {
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
