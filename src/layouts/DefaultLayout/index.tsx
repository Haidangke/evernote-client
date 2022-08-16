import NoteList from 'features/note/components/NoteList';
import Editor from 'features/editor';

function DefaultLayout() {
    return (
        <>
            <NoteList />
            <Editor />
        </>
    );
}

export default DefaultLayout;
