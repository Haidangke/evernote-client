import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchKeysConfig } from 'config';
import { useAppSelector } from 'app/hooks';

function useSearchKey() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        //xóa bỏ những key trong refresh key
        searchKeysConfig.keyRefresh.forEach((key) => {
            searchParams.delete(key);
            setSearchParams(searchParams);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;
        const searchs = location.search.substring(1, location.search.length).split('&');

        // những key nào không tồn tại trong config sẽ bị xóa bỏ
        searchs.forEach((search) => {
            const [searchKey] = search.split('=');
            if (!searchKey) return;

            if (searchKey && !searchKeysConfig.all.some((key) => key === searchKey)) {
                searchParams.delete(searchKey);
                setSearchParams(searchParams);
            }
        });
    }, [location.search, searchParams, setSearchParams, isLoggedIn]);
}

export default useSearchKey;
