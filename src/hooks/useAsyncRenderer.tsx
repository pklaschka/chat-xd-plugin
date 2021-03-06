import React, { useState } from 'react';

/**
 * The loading state of the async renderer.
 */
enum LoadingState {
	loading,
	success,
	failure
}

/**
 * A React hook to render specific content, based on a {@link Promise}'s state.
 *
 * @param promise - the promise whose value gets used
 * @param content - a callback whose return value renders when the promise resolves
 * @param error - a callback whose return value renders when the promise gets rejected.
 *
 * @returns One of the below:
 *
 * - a loading indicator if the `promise` is pending,
 * - the result of calling the `content` function with the resolved value if
 *   the `promise` resolved
 * - the result of calling the `error` function with the reason, if the
 *   `promise` got rejected
 *
 * @example
 * ```tsx
 * function MyFetchingComponent({url}) {
 *     return useAsyncRenderer(
 *         fetch(url),
 *         (res) => <p>{JSON.stringify(res)}</p>,
 *         (reason) => <p class="error">Error: {reason}</p>
 *     )
 * }
 * ```
 */
export default function useAsyncRenderer<T>(
	promise: Promise<T>,
	content: (res: T) => JSX.Element,
	error: (reason: any) => JSX.Element
): JSX.Element {
	const [value, setValue] = useState<T | undefined>(undefined);
	const [state, setState] = useState<LoadingState>(0);

	promise
		.then((v) => {
			setValue(v);
			setState(LoadingState.success);
		})
		.catch((v) => {
			setValue(v);
			setState(LoadingState.failure);
		});

	return (
		<>
			{state === LoadingState.loading && <p>Loading...</p>}
			{state === LoadingState.success && value !== undefined && content(value)}
			{state === LoadingState.failure && error(value)}
		</>
	);
}
