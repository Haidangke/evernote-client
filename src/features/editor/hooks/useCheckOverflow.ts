import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import useWindowWidth from 'hooks/useWindowWidth';

//a
function useCheckOverflow(limit: number) {
    const [isOverflow, setIsOverflow] = useState(false);

    const widthWindow = useWindowWidth();
    const widthToolbar = useAppSelector((state) => state.editor.width);
    useEffect(() => {
        if (limit > 0 && widthWindow) {
            setIsOverflow(limit + 60 < widthToolbar);
        }
    }, [limit, widthToolbar, widthWindow]);
    return isOverflow;
}

export default useCheckOverflow;
