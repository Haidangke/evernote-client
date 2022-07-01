import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';

interface RequireAuthProps {
    children: ReactElement;
}

function PrivateRoute({ children }: RequireAuthProps) {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    let location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    } else {
        return children;
    }
}

export default PrivateRoute;
