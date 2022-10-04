import { useNavigate } from 'react-router-dom';
const history: any = {
    navigate: null,
    push: (page: any, ...rest: any) => history.navigate(page, ...rest),
};

export const NavigateSetter = () => {
    history.navigate = useNavigate();

    return null;
};

export default history;
