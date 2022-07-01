import axiosClientSecret from 'utils/axiosClientSecret';

const cloudinaryServices = {
    upload: (fileToUpload: any) => {
        return axiosClientSecret.post('/cloudinary/upload', fileToUpload);
    },
};

export default cloudinaryServices;
