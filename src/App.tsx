import { Outlet, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import useFetchData from 'hooks/useFetchData';
import useSearchKey from 'hooks/useSearchKey';

import { privateRoute, publicRoute } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';
import DefaultLayout from 'components/DefaultLayout';
import Sidebar from 'features/sidebar';

import styles from './App.module.scss';
import test from 'test';

function PrivateRoutes() {
    useSearchKey();
    return (
        <PrivateRoute>
            <div className={styles.root}>
                <Sidebar />
                <Outlet />
                <Toaster />
            </div>
        </PrivateRoute>
    );
}

function App() {
    useFetchData();
    test();
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
