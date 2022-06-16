import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchKeysConfig } from 'config';

function useSearchKey() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        // searchKeysConfig.keyRefresh.forEach((key) => {
        //     searchParams.delete(key);
        //     setSearchParams(searchParams);
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const searchs = location.search.substring(1, location.search.length).split('&');
        searchs.forEach((search) => {
            const searchKey = search.split('=')[0];
            if (!searchKeysConfig.all.some((key) => key === searchKey)) {
                searchParams.delete(searchKey);
                setSearchParams(searchParams);
            }
        });
    }, [location.search, searchParams, setSearchParams]);
}

export default useSearchKey;
