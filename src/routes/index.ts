import { routesConfig } from 'config/routes';
import DefaultLayout from 'components/DefaultLayout';
import Notebook from 'features/notebook';
import LoginPage from 'features/auth/pages/Login';
import RegisterPage from 'features/auth/pages/Register';
import HomePage from 'features/home';

interface Route {
    path: string;
    component: any;
}

const privateRoute: Route[] = [
    {
        path: routesConfig.home,
        component: HomePage,
    },
    {
        path: routesConfig.notes,
        component: DefaultLayout,
    },
    {
        path: routesConfig.note,
        component: DefaultLayout,
    },
    {
        path: routesConfig.notebooks,
        component: Notebook,
    },
    {
        path: routesConfig.notebook,
        component: DefaultLayout,
    },

    {
        path: routesConfig.recycle,
        component: DefaultLayout,
    },
];

const publicRoute: Route[] = [
    { path: routesConfig.login, component: LoginPage },
    { path: routesConfig.register, component: RegisterPage },
];

export { privateRoute, publicRoute };
