import axiosClientSecret from 'utils/axiosClientSecret';

const userService = {
    updateScratch(content: string) {
        return axiosClientSecret.put('/user/scratch', { content });
    },
};

export default userService;
