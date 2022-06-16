import classNames from 'classnames/bind';

import { CalendarIcon, FileIcon, TodoIcon } from '~/assets/icons/toolbar';
import { HandleButton } from '~/pages/NotePage/components/NoteEditor/components/Button';

import InsertBtn from './Insert';
import OverflowToolbar from '../OverflowToolbar';

import Align from './Align';
import ColorPicker from './ColorPicker';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import FontStyle from './FontStyle';
import Heading from './Heading';
import History from './History';
import Link from './Link';
import ListStyle from './ListStyle';
import TextIndent from './TextIndent';

import styles from './Toolbar.module.scss';
import TextFormat from './TextFormat';
const cx = classNames.bind(styles);

interface ToolbarProps {
    onHeader: boolean;
    editor: any;
    setSearch: any;
}

function Toolbar({ onHeader, editor, setSearch }: ToolbarProps) {
    return (
        <div className={cx('toolbar', { 'toolbar-on-header': onHeader })}>
            <InsertBtn />

            <HandleButton handle={() => console.log('Handle')} content='Tệp đính kèm'>
                <FileIcon />
            </HandleButton>

            <HandleButton handle={() => console.log('Handle')} content='Nhiệm vụ'>
                <TodoIcon />
            </HandleButton>

            <HandleButton handle={() => console.log('Handle')} content='Sự kiện trên lịch'>
                <CalendarIcon />
            </HandleButton>

            <div className={cx('line')}></div>

            <History editor={editor} />

            <div className={cx('line')}></div>

            <Heading editor={editor} />

            <div className={cx('line')}></div>

            <FontFamily editor={editor} />

            <div className={cx('line')}></div>

            <FontSize editor={editor} />

            <div className={cx('line')}></div>

            <ColorPicker editor={editor} />

            <FontStyle />

            <div className={cx('line')}></div>

            <ListStyle />

            <div className={cx('line')}></div>

            <Link editor={editor} />

            <div className={cx('line')}></div>

            {/* align */}
            <Align editor={editor} />

            {/* indent outdent */}
            <TextIndent editor={editor} />

            <div className={cx('line')}></div>

            <TextFormat />

            <OverflowToolbar />
        </div>
    );
}

export default Toolbar;
