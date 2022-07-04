import Topbar from './components/Topbar';
import Footer from './components/Footer';
import Editor from './components/Editor';

import styles from './NoteEditor.module.scss';

function NoteEditor() {
    return (
        <div className={styles.wrapper}>
            <Topbar />
            <Editor />
            <Footer />
        </div>
    );
}

export default NoteEditor;
