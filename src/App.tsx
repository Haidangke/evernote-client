import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastBar, Toaster } from 'react-hot-toast';

import useFetchData from 'hooks/useFetchData';
import useSearchKey from 'hooks/useSearchKey';

import { privateRoute, publicRoute } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';
import DefaultLayout from 'components/DefaultLayout';
import Sidebar from 'features/sidebar';

import styles from './App.module.scss';
import './App.scss';

function PrivateRoutes() {
    useSearchKey();
    return (
        <PrivateRoute>
            <div className={styles.root}>
                <Sidebar />
                <Outlet />
                <Toaster>
                    {(t) => (
                        <ToastBar
                            toast={t}
                            style={{
                                ...t.style,
                                animation: t.visible
                                    ? 'custom-enter 0.7s ease'
                                    : 'custom-exit 0.7s ease forwards ',
                            }}
                        />
                    )}
                </Toaster>
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
