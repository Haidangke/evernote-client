import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchKeysConfig } from '~/config';

function useSearchKey() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    useEffect(() => {
        const searchs = location.search.substring(1, location.search.length).split('&');
        searchs.forEach((search) => {
            const searchKey = search.split('=')[0];
            if (!searchKeysConfig.some((key) => key === searchKey)) {
                searchParams.delete(searchKey);
                setSearchParams(searchParams);
            }
        });
    }, [location.search, searchParams, setSearchParams]);
}

export default useSearchKey;
