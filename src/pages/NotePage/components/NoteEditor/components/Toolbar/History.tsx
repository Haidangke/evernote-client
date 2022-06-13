import { HistoryEditor } from 'slate-history';

import classNames from 'classnames';
import { RedoIcon, UndoTcon } from '~/components/Icon/Toolbar';
import { HandleButton } from '../Button';
import styles from './Toolbar.module.scss';

const cx = classNames.bind(styles);

const History = ({ editor }: any) => {
    const { history } = editor;
    const { undos, redos } = history;
    return (
        <>
            <HandleButton
                disable={undos.length === 0}
                handle={() => HistoryEditor.undo(editor)}
                content='Hoàn tác'
                className={cx({ btn__disable: undos.length === 0 })}
            >
                <UndoTcon />
            </HandleButton>

            {/* redo */}
            <HandleButton
                disable={redos.length === 0}
                handle={() => HistoryEditor.undo(editor)}
                content='Làm lại'
                className={cx({ btn__disable: redos.length === 0 })}
            >
                <RedoIcon />
            </HandleButton>
        </>
    );
};

export default History;
