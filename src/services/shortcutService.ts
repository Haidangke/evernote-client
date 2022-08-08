import { Shortcut, ShortcutParams } from 'types';
import axiosClientSecret from 'utils/axiosClientSecret';

const shortcutService = {
    getAll(): Promise<Shortcut[]> {
        return axiosClientSecret.get('/shortcut');
    },
    create(params: ShortcutParams) {
        return axiosClientSecret.post('/shortcut', params);
    },
};

export default shortcutService;
