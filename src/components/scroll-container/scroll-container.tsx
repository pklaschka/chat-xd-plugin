import React, { ReactNode } from 'react';
import './scroll-container.scss';
import { useCustomScrollController } from './use-custom-scroll-controller';

/**
 * Props for the {@link ScrollContainer} component
 */
type ScrollContainerProps = { children: ReactNode };

/**
 * A custom scrolling container optimized for chat windows.
 *
 * @param props - the props passed to the component
 * @returns the rendered {@link JSX.Element}
 *
 * @example
 * ```tsx
 * <ScrollContainer>
 *     [...] (Many children)
 * </ScrollContainer>
 * ```
 */
export default function ScrollContainer(
	props: ScrollContainerProps
): JSX.Element {
	const {
		x,
		isScrolledToBottom,
		innerContainerRef,
		outerContainerRef,
		scrollDelta,
		scrollToBottom
	} = useCustomScrollController();

	return (
		<div
			className="scroll-container"
			ref={outerContainerRef}
			onWheel={(e) => scrollDelta(e.deltaY)}>
			<div
				className="scroll-container-inner"
				ref={innerContainerRef}
				style={{ top: `${-x}px` }}>
				{props.children}
			</div>

			{!isScrolledToBottom && (
				<button uxp-variant={'cta'} onClick={scrollToBottom}>
					Scroll to bottom
				</button>
			)}
		</div>
	);
}
