import { ReactNode } from 'react';

import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className='root'>
            <Sidebar />

            {children}
        </div>
    );
}

export default DefaultLayout;
