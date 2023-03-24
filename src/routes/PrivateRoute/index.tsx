import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';

interface RequireAuthProps {
    children: ReactElement;
}

function PrivateRoute({ children }: RequireAuthProps) {
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const note = useAppSelector((state) => state.note);
    const tag = useAppSelector((state) => state.tag);
    const notebook = useAppSelector((state) => state.notebook);

    let location = useLocation();

    if (!isLoggedIn && !user) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (!(note && tag && notebook && user)) {
        return <h1>Loading</h1>;
    }

    return children;
}

export default PrivateRoute;
