import { RefObject } from 'react';

/**
 * An interface for the custom scroll controller
 */
export interface CustomScrollController {
	/**
	 * Scroll by a passed amount.
	 *
	 * @param amount - the amount to scroll.
	 * Positive numbers indicate scrolling up and vice versa
	 */
	scrollDelta: (amount: number) => void;
	/**
	 * `true` if it's currently scrolled to the bottom
	 */
	isScrolledToBottom: boolean;
	/**
	 * A ref that needs to get passed to the inner container
	 */
	innerContainerRef: RefObject<HTMLDivElement>;
	/**
	 * A ref that needs to get passed to the outer container
	 */
	outerContainerRef: RefObject<HTMLDivElement>;
	/**
	 * A function to scroll to the bottom
	 */
	scrollToBottom: () => void;
	/**
	 * The length the inner container extends above the top bounds of the outer
	 * container
	 */
	x: number;
}
