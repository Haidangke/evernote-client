import { ReactNode } from 'react';
import NoteList from '~/pages/NotePage/components/NoteList';
import Sidebar from '../components/Sidebar';

interface NoteLayoutProps {
    children: ReactNode;
}

function NoteLayout({ children }: NoteLayoutProps) {
    return (
        <div className='root'>
            <Sidebar />
            <NoteList />
            {children}
        </div>
    );
}

export default NoteLayout;
