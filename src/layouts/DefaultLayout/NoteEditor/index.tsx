import { useSearchParams } from 'react-router-dom';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import Editor from './components/Editor';

import styles from './NoteEditor.module.scss';

function NoteEditor() {
    const [searchParams] = useSearchParams();
    const noteId = searchParams.get('n');
    if (!noteId) return <></>;

    return (
        <div className={styles.wrapper}>
            <Topbar />
            <Editor />
            <Footer />
        </div>
    );
}

export default NoteEditor;
