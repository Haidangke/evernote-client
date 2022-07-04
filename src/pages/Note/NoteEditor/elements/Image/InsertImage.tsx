import { useState } from 'react';
import { useSlateStatic } from 'slate-react';

import { insertImage, isImageUrl } from 'pages/Note/NoteEditor/plugins/withImages';
import cloudinaryServices from 'services/cloudinaryService';
import Modal from 'components/Modal';

function InsertImage() {
    const editor = useSlateStatic();
    const [isLoading, setIsLoading] = useState(false);
    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        console.log(file);
        // if (!isImageUrl(file)) {
        //     alert('URL is not an image');
        //     return;
        // }
        previewFile(file);

        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const previewFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
    };

    const uploadImage = async (base64EncodedImage: any) => {
        try {
            setIsLoading(true);
            const response: any = await cloudinaryServices.upload({
                file: base64EncodedImage,
            });
            setIsLoading(false);
            const url = response.url;
            insertImage(editor, url);
        } catch (err) {
            setIsLoading(false);
        }
    };
    return (
        <input
            id='fileInput'
            type='file'
            name='image'
            onChange={handleFileInputChange}
            className='form-input'
        />
    );
}

export default InsertImage;
