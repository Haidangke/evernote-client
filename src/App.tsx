import { Route, Routes as Switch } from 'react-router-dom';
import useFetchData from 'hooks/useFetchData';
import useSearchKey from 'hooks/useSearchKey';

import { privateRoute, publicRoute } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
    useSearchKey();
    useFetchData();
    return (
        <Switch>
            {publicRoute.map((route) => {
                const Component = route.component;
                return <Route key={route.path} path={route.path} element={<Component />} />;
            })}

            {privateRoute.map((route) => {
                const Component = route.component;
                const Layout = route.layout ? route.layout : DefaultLayout;

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Component />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                );
            })}

            <Route path='*' element={<h1>Not Found !</h1>} />
        </Switch>
    );
}

export default App;
