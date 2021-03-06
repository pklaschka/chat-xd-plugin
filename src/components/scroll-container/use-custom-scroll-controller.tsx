import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import cap from '../../lib/cap';
import { CustomScrollController } from './custom-scroll-controller';

/**
 * Implements a custom scrolling controller, optimized for chats.
 *
 * Scrolls down when new messages get appended, if it is previously fully scrolled to the bottom.
 *
 * Shows a "scroll to bottom" button, if not fully scrolled to the bottom.
 *
 * ## Diagram
 * ```
 *          ─┬─ ─┬─  ┌────────────────────┐
 * deltaX │  │   │   │                    │
 *        │  │   x   │  inner container   │
 *        ▼  │   │   │                    │
 *           │  ─┼─ ┌┼┬──────────────────┬┼─────────┐
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼─────┼┼┼┼│
 *          h_1 h_0 │┼│   visible part   ││outer└───┤
 *           │   │  │┼│of inner container││container│
 *           │   │  │┼│                  │┼─────────┤
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │   │  │┼│                  │┼┼┼┼┼┼┼┼┼┼│
 *           │  ─┴─ └┼┴──────────────────┴┼─────────┘
 *           │       │  inner container   │
 *          ─┴─      └────────────────────┘
 *          deltaH = h_1 - h_0
 * ```
 *
 * @returns the {@link CustomScrollController} that can be used to implement a
 * component with custom scrolling.
 *
 * @example
 * ```tsx
 * const {
 *     x,
 *     isScrolledToBottom,
 *     innerContainerRef,
 *     outerContainerRef,
 *     scrollDelta,
 *     scrollToBottom
 * } = useCustomScrollContainer();
 *
 * return <div ref={outerContainerRef} onWheel={(e) => scrollDelta(e.deltaY)}>
 *     <div
 *         ref={innerContainerRef}
 *         style={{ top: `${-x}px` }}>
 *         [...]
 *     </div>
 *     {!isScrolledToBottom && <button onClick={scrollToBottom}>Scroll down</button>}
 * </div>
 * ```
 */
export function useCustomScrollController(): CustomScrollController {
	const [x, setX] = useState(0);
	const [deltaX, setDeltaX] = useState(0);
	const [oldDeltaH, setOldDeltaH] = useState(0);

	const innerContainer = useRef<HTMLDivElement>(null);
	const outerContainer = useRef<HTMLDivElement>(null);

	/**
	 * Scroll, based on a delta of pixels (deltaDeltaX)
	 */
	const scrollDelta = useCallback(
		(deltaDeltaX: number) => {
			setDeltaX(deltaX + deltaDeltaX);
		},
		[x]
	);

	// Update x based on accumulated deltaX,
	// capping it to not exceed bounds
	useLayoutEffect(() => {
		const deltaH =
			(innerContainer.current?.scrollHeight || 0) -
			(outerContainer.current?.clientHeight || 0);
		const newX = x + deltaX;

		if (newX === oldDeltaH) {
			// fully scrolled down based on previous heights =>
			// wait for things to have the correct dimensions ...
			setTimeout(() => {
				const deltaH =
					(innerContainer.current?.scrollHeight || 0) -
					(outerContainer.current?.clientHeight || 0);
				// ... then scroll to bottom
				setX(cap(0, deltaH, deltaH));
			}, 100);
		} else {
			// Wasn't scrolled down before => just apply the newX,
			// capping it in case it exceeds the limits.
			setX(cap(0, newX, deltaH));
		}
		setOldDeltaH(deltaH);
		setDeltaX(0);
	});

	// Re-constrain values when one of the containers changes
	useLayoutEffect(() => {
		setTimeout(() => {
			const deltaH =
				(innerContainer.current?.scrollHeight || 0) -
				(outerContainer.current?.clientHeight || 0);
			setOldDeltaH(deltaH);
			setX(cap(0, deltaH, deltaH));
		}, 100);
	}, [innerContainer, outerContainer]);

	const scrollToBottom = useCallback(() => {
		const deltaH =
			(innerContainer.current?.scrollHeight || 0) -
			(outerContainer.current?.clientHeight || 0);
		setDeltaX(0);
		setX(deltaH);
		setOldDeltaH(deltaH);
	}, [innerContainer, outerContainer, setDeltaX, setX, setOldDeltaH]);

	// Scroll to bottom on initial load
	useLayoutEffect(() => {
		setTimeout(() => scrollToBottom(), 500);
	}, []);

	return {
		x,
		isScrolledToBottom: oldDeltaH === x,
		innerContainerRef: innerContainer,
		outerContainerRef: outerContainer,
		scrollDelta,
		scrollToBottom
	};
}
