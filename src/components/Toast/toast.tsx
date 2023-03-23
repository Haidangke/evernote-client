import toast from 'react-hot-toast';

import { WarningIcon } from 'components/Icons';
import Toast from 'components/Toast';
import { ReactElement } from 'react';

const toastError = (error: string) => {
    toast.remove();
    toast((t) => (
        <Toast type='error' toastId={t.id}>
            <>
                <WarningIcon />
                {error}
            </>
        </Toast>
    ));
};

const toastInfo = (content: string) => {
    toast.remove();
    toast((t) => <Toast toastId={t.id} content={content} />);
};

const toastChildren = (children: ReactElement) => {
    toast.remove();
    toast((t) => <Toast toastId={t.id}>{children}</Toast>);
};

export { toastError, toastInfo, toastChildren };
