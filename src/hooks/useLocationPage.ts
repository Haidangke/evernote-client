import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Page = 'notebook' | 'note' | 'notes' | '';

const pages: Page[] = ['notebook', 'note' , 'notes'];

function useLocationPage() {
    const [page, setPage] = useState<Page>('');
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        pages.forEach((page) => {
            if (pathname.slice(1, pathname.length) === page) setPage(page);
        });
    }, [pathname]);

    return page;
}

export default useLocationPage;
