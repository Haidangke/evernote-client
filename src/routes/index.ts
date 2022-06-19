import { RecyclePage, HomePage, LoginPage, NotebookPage, NotePage, RegisterPage } from 'pages';
import { routesConfig } from 'config';

interface Route {
    path: string;
    component: any;
    layout?: any;
}

const privateRoute: Route[] = [
    {
        path: routesConfig.home,
        component: HomePage,
    },

    {
        path: routesConfig.note,
        component: NotePage,
    },

    {
        path: routesConfig.notebook,
        component: NotebookPage,
    },

    {
        path: routesConfig.recycle,
        component: RecyclePage,
    },
];

const publicRoute: Route[] = [
    { path: routesConfig.login, component: LoginPage },
    { path: routesConfig.register, component: RegisterPage },
];

export { privateRoute, publicRoute };
