import NoteTable from 'features/note/components/NoteTable';
import Draft from 'features/draft';

function DefaultLayout() {
    return (
        <>
            <NoteTable />
            {/* <Editor /> */}
            <Draft />
        </>
    );
}

export default DefaultLayout;
