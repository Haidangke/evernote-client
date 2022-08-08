import { RecyclePage, HomePage, LoginPage, NotebookPage, RegisterPage } from 'pages';
import { routesConfig } from 'config';
import NoteLayout from 'layouts/DefaultLayout';

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
        path: routesConfig.note,
        component: NoteLayout,
    },

    {
        path: routesConfig.notebooks,
        component: NotebookPage,
    },
    {
        path: routesConfig.notebook,
        component: NoteLayout,
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
