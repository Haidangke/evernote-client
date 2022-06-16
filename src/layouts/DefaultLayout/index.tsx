import React, { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Slidebar from '../components/Slidebar';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className='root'>
            <Sidebar />
            <Slidebar />
            {children}
        </div>
    );
}

export default DefaultLayout;
