import config from '~/config';
import NoteLayout from '~/layouts/NoteLayout';
import { RecyclePage, HomePage, LoginPage, NotebookPage } from '~/pages';
import NoteEditor from '~/pages/NotePage/components/NoteEditor';

interface Route {
    path: string;
    component: any;
    layout?: any;
}

const privateRoute: Route[] = [
    {
        path: config.routes.home,
        component: HomePage,
    },

    {
        path: config.routes.note,
        component: NoteEditor,
        layout: NoteLayout,
    },

    {
        path: config.routes.notebook,
        component: NotebookPage,
    },

    {
        path: config.routes.recycle,
        component: RecyclePage,
    },
];

const publicRoute: Route[] = [{ path: config.routes.login, component: LoginPage }];

export { privateRoute, publicRoute };
