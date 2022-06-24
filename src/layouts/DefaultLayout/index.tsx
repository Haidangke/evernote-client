import { useAppDispatch } from 'app/hooks';
import { fetchNotebooks } from 'app/thunk/notebookThunk';
import { ReactNode, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchNotebooks());
    }, [dispatch]);

    return (
        <div className='root'>
            <Sidebar />

            {children}
        </div>
    );
}

export default DefaultLayout;
