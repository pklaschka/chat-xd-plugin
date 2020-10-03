import React, { useState } from 'react';

enum LoadingState {
	loading,
	success,
	failure
}

export default function useAsyncRenderer<T>(
	promise: Promise<T>,
	content: (res: T) => JSX.Element,
	error: (reason: any) => JSX.Element
) {
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
			{state === LoadingState.success && content(value!)}
			{state === LoadingState.failure && error(value!)}
		</>
	);
}
