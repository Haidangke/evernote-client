import { useEffect, useState } from 'react';

function useMouseMove() {
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleWindowMouseMove = (event: any) => {
            setGlobalCoords({
                x: event.clientX,
                y: event.clientY,
            });
        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, []);
    return globalCoords;
}

export default useMouseMove;
