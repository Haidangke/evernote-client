import { useNavigate, createSearchParams } from 'react-router-dom';

type Params = {
    n?: string;
    b?: string;
    [key: string]: any;
};

function useNavigateParams() {
    const navigate = useNavigate();

    return (params: Params, pathname: string) => {
        navigate({
            pathname,
            search: `?${createSearchParams(params)}`,
        });
    };
}

export default useNavigateParams;
