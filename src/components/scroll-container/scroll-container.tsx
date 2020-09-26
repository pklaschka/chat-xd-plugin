import React, {ReactNode, useCallback, useRef, useState} from 'react';
import './scroll-container.scss';
import useLogger from "../../hooks/useLogger";

export default function ScrollContainer({children}: { children: ReactNode }) {
    const logger = useLogger('ScrollContainer');

    const [pos, setPos] = useState(0);

    const innerContainer = useRef<HTMLDivElement>(null);
    const outerContainer = useRef<HTMLDivElement>(null);

    const applyWheel = useCallback((e: React.WheelEvent<HTMLElement>) => {
        const min = (outerContainer.current?.clientHeight || 0) - (innerContainer.current?.clientHeight || 0);

        const newPos = Math.max(Math.min(pos + e.deltaY, 0), min);
        logger.debug('New scroll position:', newPos);
        setPos(newPos);
    }, [pos, setPos, innerContainer, outerContainer])


    return <div className="scroll-container" ref={outerContainer} onWheel={applyWheel}>
        <div className="scroll-container-inner" ref={innerContainer} style={{bottom: pos}}>
            {children}
        </div>
    </div>
}
