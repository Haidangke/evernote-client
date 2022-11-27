import { useLocation } from 'react-router-dom';

type Page = 'notebook' | 'note' | 'notes' | 'recycle';

const pages: Page[] = ['notebook', 'note', 'notes', 'recycle'];

function useLocationPage() {
    const location = useLocation();
    const pathname = location.pathname;

    const path = pathname.slice(1, pathname.length);

    return pages.includes(path as Page) ? path : '';
}

export default useLocationPage;
