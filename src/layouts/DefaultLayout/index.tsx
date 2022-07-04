import { ReactNode } from 'react';

import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className={styles.root}>
            <Sidebar />

            {children}
        </div>
    );
}

export default DefaultLayout;
