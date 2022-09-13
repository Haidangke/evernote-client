import Modal from 'components/Modal';
import Loading from 'components/Loading';

import styles from './UploadLoading.module.scss';
import { useAppSelector } from 'app/hooks';

function UploadLoading() {
    const { isLoading } = useAppSelector((state) => state.editor.upload);

    return (
        <Modal isOpen={isLoading} isSmall>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>
                    Xin chờ một chút cho đến khi chúng tôi đính kèm tệp của bạn
                </h3>
                <div className={styles.icon}>
                    <Loading />
                </div>
            </div>
        </Modal>
    );
}

export default UploadLoading;
