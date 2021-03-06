import {
	ComponentLogger,
	Logger,
	PlainLogger,
	WebhookLogger
} from '@fliegwerk/logsemts';
import { UXPLogger } from '../lib/uxp-logger';

/**
 * The Plugin-Specific core logsemts logger.
 *
 * Doesn't log for builds created in an environment with `CI=true`
 */
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
 * A React hook that manages a {@link ComponentLogger} for a specific component.
 *
 * Prefixes `'Document Chat: '` to the `component` name
 *
 * @param component - the component's name
 *
 * @returns the {@link ComponentLogger} for `'Document Chat: ' + component`
 *
 *
 * @example
 * ```tsx
 * function SomeReactComponent() {
 *     const logger = useLogger('SomeReactComponent');
 *
 *     logger.debug('Hello World!');
 *
 *     return <h1>Hello World</h1>;
 * }
 * ```
 */
export default function useLogger(component: string): ComponentLogger {
	return logger.getComponentLogger('Document Chat: ' + component);
}
