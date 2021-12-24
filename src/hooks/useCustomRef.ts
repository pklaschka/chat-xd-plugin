import React, { useState } from 'react';

/**
 * A ref object for an arbitrary type `T`
 *
 * @typeparam T - The type of the ref's value
 */
export interface RefObject<T> {
	/**
	 * A function to update the ref's current value
	 */
	updateRef: React.Dispatch<React.SetStateAction<T | null>>;
	/**
	 * The ref's current value
	 */
	readonly current: T | null;
}

/**
 * A React hook that enables using custom Ref-like objects with arbitrary types.
 *
 * @param initialRefValue - the ref's initial value
 * @returns the object storing the current ref value as well as a function to
 * update that value.
 * @example
 * ```tsx
 * function ComponentA() {
 *     const myRef = useCustomRef<boolean>(null);
 *
 *     return <ComponentB customRef={myRef} />
 * }
 *
 * function ComponentB({customRef}) {
 *     useEffect(() => {
 *         customRef.updateRef(true);
 *
 *         return () => customRef.updateRef(null);
 *     });
 *
 *     return <p>Hello World</p>
 * }
 * ```
 */
export function useCustomRef<T>(initialRefValue: T | null): RefObject<T> {
	const [currentRef, setCurrentRef] = useState<T | null>(initialRefValue);

	return {
		current: currentRef,
		updateRef: (newState) => {
			if (currentRef !== newState) setCurrentRef(newState);
		}
	};
}
