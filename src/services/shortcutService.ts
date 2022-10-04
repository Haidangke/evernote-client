import { Shortcut, ShortcutParams } from 'types';
import axiosClientSecret from 'services/axiosClientSecret';

const shortcutService = {
    getAll(): Promise<Shortcut[]> {
        return axiosClientSecret.get('/shortcut');
    },
    create(params: ShortcutParams): Promise<Shortcut> {
        return axiosClientSecret.post('/shortcut', params);
    },
};

export default shortcutService;