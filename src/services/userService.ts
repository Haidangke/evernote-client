import { User } from 'types';
import { axiosClientSecret } from 'services/axiosInstance';

const userService = {
    updateScratch(content: string) {
        return axiosClientSecret.put('/user/scratch', { content });
    },

    getInfoUser(): Promise<User> {
        return axiosClientSecret.get('/user/info');
    },
};

export default userService;
