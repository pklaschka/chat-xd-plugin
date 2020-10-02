import { Logger, WebhookLogger, PlainLogger } from '@fliegwerk/logsemts';

const logger = new Logger({
	loggers: [WebhookLogger({ address: 'http://localhost:8080' }), PlainLogger()]
});

export default function useLogger(component: string) {
	return logger.getComponentLogger('Document Chat: ' + component);
}
