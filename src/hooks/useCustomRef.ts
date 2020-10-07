import React, { useState } from 'react';

export interface RefObject<T> {
	updateRef: React.Dispatch<React.SetStateAction<T | null>>;
	current: T | null;
}

export function useCustomRef<T>(initialRefValue: T | null): RefObject<T> {
	const [currentRef, setCurrentRef] = useState<T | null>(initialRefValue);

	return {
		current: currentRef,
		updateRef: (newState) => {
			if (currentRef !== newState) setCurrentRef(newState);
		}
	};
}
