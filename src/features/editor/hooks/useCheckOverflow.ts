import { useAppSelector } from 'app/hooks';
import useWindowWidth from 'hooks/useWindowWidth';

//a
function useCheckOverflow(limit: number) {
    const width = useWindowWidth();
    const rectX = useAppSelector((state) => state.editor.rectX);
    if (limit > 0 && rectX) {
        return rectX + limit + 60 < width;
    }
}

export default useCheckOverflow;
