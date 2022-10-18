import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Resizable } from 're-resizable';

import useWindowWidth from 'hooks/useWindowWidth';
import { useAppSelector } from 'app/hooks';

function NoteTableWrapper({ children }: { children: ReactNode }) {
    const [resizable, setResizable] = useState({ width: 320, height: '100vh' });
    const [maxWidth, setMaxWidth] = useState(600);

    const width = useWindowWidth();

    const [searchParams] = useSearchParams();
    const isShow = searchParams.get('an');
    const expand = JSON.parse(searchParams.get('fs') || 'false');

    const { isSmall } = useAppSelector((state) => state.sidebar);

    useEffect(() => {
        if (width === 0) return;
        if (isSmall) {
            setMaxWidth(width - 560);
        } else {
            setMaxWidth(width - 900);
        }
    }, [width, isSmall]);

    if (!isShow || expand) return <></>;

    return (
        <Resizable
            enable={{ right: true }}
            maxWidth={maxWidth}
            minWidth={280}
            size={{ width: resizable.width, height: resizable.height }}
            onResizeStop={(e, direction, ref, d) => {
                setResizable({
                    width: resizable.width + d.width,
                    height: resizable.height + d.height,
                });
            }}
        >
            {children}
        </Resizable>
    );
}

export default NoteTableWrapper;
