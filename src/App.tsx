import { Outlet, Route, Routes } from 'react-router-dom';
import useFetchData from 'hooks/useFetchData';
import useSearchKey from 'hooks/useSearchKey';

import { privateRoute, publicRoute } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';
import DefaultLayout from 'layouts/DefaultLayout';
import Sidebar from 'features/sidebar';

import styles from './App.module.scss';

function PrivateRoutes() {
    useSearchKey();
    return (
        <PrivateRoute>
            <div className={styles.root}>
                <Sidebar />
                <Outlet />
            </div>
        </PrivateRoute>
    );
}

function App() {
    useFetchData();
    return (
        <Routes>
            {publicRoute.map((route) => {
                const Component = route.component;
                return <Route key={route.path} path={route.path} element={<Component />} />;
            })}
            <Route path='/' element={<PrivateRoutes />}>
                {privateRoute.map((route) => {
                    const Component = route.component || DefaultLayout;

                    return <Route key={route.path} path={route.path} element={<Component />} />;
                })}
            </Route>

            <Route path='*' element={<h1>Not Found !</h1>} />
        </Routes>
    );
}

export default App;
