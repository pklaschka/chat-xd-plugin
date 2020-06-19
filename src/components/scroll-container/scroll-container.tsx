import React, {ReactNode, useState} from 'react';
import './scroll-container.scss';

export default function ScrollContainer({children}: { children: ReactNode }) {
    const [pos, setPos] = useState(0);

    return <div className="scroll-container">
        <div className="scroll-container-inner">
            {children}
        </div>
    </div>
}
