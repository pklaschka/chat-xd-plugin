import { Logger, PlainLogger, WebhookLogger } from '@fliegwerk/logsemts';
import { UXPLogger } from '../lib/uxp-logger';

const logger = new Logger({
	loggers:
		process.env.CI === 'true'
			? []
			: [
					WebhookLogger({ address: 'http://localhost:8080' }),
					PlainLogger(),
					UXPLogger()
			  ]
});

/**
 * Returns the logger for a specific component
 * @param component the component's name
 */
export default function useLogger(component: string) {
	return logger.getComponentLogger('Document Chat: ' + component);
}

window.onerror = function (e) {
	useLogger('window.onerror').error(e);
};
