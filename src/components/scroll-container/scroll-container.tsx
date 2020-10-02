import React, {
	ReactNode,
	useCallback,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import './scroll-container.scss';
import useLogger from '../../hooks/useLogger';
import cap from '../../lib/cap';

export default function ScrollContainer({
	children
}: {
	children: ReactNode;
	model: any;
}) {
	const logger = useLogger('ScrollContainer');

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

		logger.info('deltaH at event', deltaH);

		setTimeout(
			() =>
				logger.info(
					'deltaH after 100ms',
					(innerContainer.current?.scrollHeight || 0) -
						(outerContainer.current?.clientHeight || 0)
				),
			100
		);

		if (newX === oldDeltaH) {
			logger.debug(
				'Layout effect: cap, branch latest',
				cap(0, deltaH, deltaH),
				deltaH
			);
			setX(cap(0, deltaH, deltaH));
		} else {
			logger.debug(
				'Layout effect: cap, branch history',
				cap(0, newX, deltaH),
				deltaH
			);
			setX(cap(0, newX, deltaH));
		}
		setOldDeltaH(deltaH);
		setDeltaX(0);
	});

	useLayoutEffect(() => {
		setTimeout(() => {
			logger.debug('Layout Effect: Initial old deltaH');
			const deltaH =
				(innerContainer.current?.scrollHeight || 0) -
				(outerContainer.current?.clientHeight || 0);
			setOldDeltaH(deltaH);
			setX(cap(0, deltaH, deltaH));
		}, 100);
	}, [innerContainer, outerContainer]);

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
		</div>
	);
}
