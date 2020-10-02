import { Logger, PlainLogger, WebhookLogger } from '@fliegwerk/logsemts';

const logger = new Logger({
	loggers: [WebhookLogger({ address: 'http://localhost:8080' }), PlainLogger()]
});

/**
 * Returns the logger for a specific component
 * @param component the component's name
 */
export default function useLogger(component: string) {
	return logger.getComponentLogger('Document Chat: ' + component);
}
