import toast from 'react-hot-toast';

import { WarningIcon } from 'components/Icons';
import Toast from 'components/Toast';

const toastError = (error: string) => {
    toast.remove();
    toast((t) => (
        <Toast type='error' toastId={t.id}>
            <span
            // className={styles.toast}
            >
                <WarningIcon />
                {error}
            </span>
        </Toast>
    ));
};

export { toastError };
