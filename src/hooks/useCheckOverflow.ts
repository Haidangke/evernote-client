import { useAppSelector } from 'app/hooks';
import useWindowSize from './useWindowSize';
//a
function useCheckOverflow(limit: number) {
    const [width] = useWindowSize();
    const rectX = useAppSelector((state) => state.toolbar.rectX);
    if (limit > 0 && rectX) {
        return rectX + limit + 60 < width;
    }
}

export default useCheckOverflow;
