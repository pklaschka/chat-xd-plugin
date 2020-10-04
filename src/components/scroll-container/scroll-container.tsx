import React, {
	ReactNode,
	useCallback,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import cap from '../../lib/cap';
import './scroll-container.scss';

export default function ScrollContainer({
	children
}: {
	children: ReactNode;
	model: any;
}) {
	const [x, setX] = useState(0);
	const [deltaX, setDeltaX] = useState(0);
	const [oldDeltaH, setOldDeltaH] = useState(0);

	const innerContainer = useRef<HTMLDivElement>(null);
	const outerContainer = useRef<HTMLDivElement>(null);

	const scrollDelta = useCallback(
		(deltaDeltaX: number) => {
			setDeltaX(deltaX + deltaDeltaX);
		},
		[x]
	);

	useLayoutEffect(() => {
		const deltaH =
			(innerContainer.current?.scrollHeight || 0) -
			(outerContainer.current?.clientHeight || 0);
		const newX = x + deltaX;

		if (newX === oldDeltaH) {
			setTimeout(() => {
				const deltaH =
					(innerContainer.current?.scrollHeight || 0) -
					(outerContainer.current?.clientHeight || 0);
				setX(cap(0, deltaH, deltaH));
			}, 100);
		} else {
			setX(cap(0, newX, deltaH));
		}
		setOldDeltaH(deltaH);
		setDeltaX(0);
	});

	useLayoutEffect(() => {
		setTimeout(() => {
			const deltaH =
				(innerContainer.current?.scrollHeight || 0) -
				(outerContainer.current?.clientHeight || 0);
			setOldDeltaH(deltaH);
			setX(cap(0, deltaH, deltaH));
		}, 100);
	}, [innerContainer, outerContainer]);

	const scrollToBottom = () => {
		const deltaH =
			(innerContainer.current?.scrollHeight || 0) -
			(outerContainer.current?.clientHeight || 0);
		setDeltaX(0);
		setX(deltaH);
		setOldDeltaH(deltaH);
	};

	useLayoutEffect(() => {
		setTimeout(() => scrollToBottom(), 500);
	}, []);

	return (
		<div
			className="scroll-container"
			ref={outerContainer}
			onWheel={(e) => scrollDelta(e.deltaY)}>
			<div
				className="scroll-container-inner"
				ref={innerContainer}
				style={{ top: `${-x}px` }}>
				{children}
			</div>

			{x !== oldDeltaH && (
				<button uxp-variant={'cta'} onClick={scrollToBottom}>
					Scroll to bottom
				</button>
			)}
		</div>
	);
}
