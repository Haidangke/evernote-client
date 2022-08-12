import { useNavigate, createSearchParams } from 'react-router-dom';

function useNavigateParams() {
    const navigate = useNavigate();

    return (
        pathname: string,
        params?: {
            [key: string]: any;
        }
    ) => {
        navigate({
            pathname,
            search: `?${createSearchParams(params)}`,
        });
    };
}

export default useNavigateParams;
