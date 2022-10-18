import NoteTable from 'features/note/components/NoteTable';
import Editor from 'features/editor';

function DefaultLayout() {
    return (
        <>
            <NoteTable />
            <Editor />
        </>
    );
}

export default DefaultLayout;
