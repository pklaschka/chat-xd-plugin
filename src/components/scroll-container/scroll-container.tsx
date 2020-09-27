import React, {ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import './scroll-container.scss';
import useLogger from "../../hooks/useLogger";

export default function ScrollContainer({children, model}: { children: ReactNode, model: any }) {
    const logger = useLogger('ScrollContainer');

    const [pos, setPos] = useState(0);
    const [oldHeight, setOldHeight] = useState(0);

    const innerContainer = useRef<HTMLDivElement>(null);
    const outerContainer = useRef<HTMLDivElement>(null);

    const applyWheel = useCallback((e: React.WheelEvent<HTMLElement>) => {
        const min = (outerContainer.current?.clientHeight || 0) - (innerContainer.current?.clientHeight || 0);

        const newPos = Math.max(Math.min(pos + e.deltaY, 0), min);
        logger.debug('New scroll position:', newPos);
        setPos(newPos);
    }, [pos, setPos, innerContainer, outerContainer])

    useLayoutEffect(() => {
        const min = (outerContainer.current?.clientHeight || 0) - (innerContainer.current?.clientHeight || 0);

        const newPos = Math.max(Math.min(pos, 0), min);
        logger.debug('Initial scroll position:', newPos);
        setPos(newPos);
        setOldHeight(innerContainer.current?.clientHeight ?? 0);
    }, [innerContainer, outerContainer])

    useLayoutEffect(() => {
        // Inner container height has changed
        if (pos !== 0) {
            const newPos = pos + oldHeight - (innerContainer.current?.clientHeight ?? 0);
            logger.debug('Adjust position as user is not on the latest message. Previous position:', pos, 'New position:', newPos);
            setPos(newPos);
        }
        setOldHeight(innerContainer.current?.clientHeight ?? 0);
    }, [model])

    return <div className="scroll-container" ref={outerContainer} onWheel={applyWheel}>
        <div className="scroll-container-inner" ref={innerContainer} style={{bottom: pos}}>
            {children}
        </div>
    </div>
}
