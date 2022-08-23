import { useState } from 'react';
import { useSlateStatic } from 'slate-react';

import cloudinaryServices from 'services/cloudinaryService';
import { useAppDispatch } from 'app/hooks';
import { editorActions } from 'features/editor/editorSlice';

function InsertImage() {
    const editor = useSlateStatic();
    const dispatch = useAppDispatch();

    function isImage(url: string) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        if (!file || !isImage(file.name)) {
            alert('URL is not an image');
            return;
        }
        previewFile(file);

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
            dispatch(editorActions.setUpload({ isLoading: true, messeage: '' }));
            console.log('Bắt dầu tải ảnh lên');
            const response: any = await cloudinaryServices.upload({
                file: base64EncodedImage,
            });

            const url = response.url;

            console.log('Tải ảnh hoàn tất', url);
            // insertImage(editor, url);
        } catch (err) {}
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
