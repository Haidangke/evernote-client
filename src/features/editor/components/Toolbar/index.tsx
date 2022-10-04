import { memo, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useSlate } from 'slate-react';
import classNames from 'classnames/bind';

import { editorActions } from 'features/editor/editorSlice';
import { useAppDispatch } from 'app/hooks';

import { BlockButton, MarkButton } from '../SlateButton';
import OverflowToolbar from '../OverflowToolbar';
import Align from './Align';
import ColorPicker from './ColorPicker';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import Heading from './Heading';
import History from './History';
import Link from './Link';
import TextIndent from './TextIndent';
import Info from '../SlateInfo';
import Todo from './Todo';

import {
    BoldIcon,
    BulletedListIcon,
    ItalicIcon,
    LineThrougnIcon,
    NumberListIcon,
    SubScriptIcon,
    TestListIcon,
    UnderlineIcon,
    UpperIndexIcon,
} from 'assets/icons/toolbar';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

interface ToolbarProps {
    onHeader: boolean;
    setSearch: any;
}

function Toolbar({ onHeader, setSearch }: ToolbarProps) {
    const dispatch = useAppDispatch();
    
    const editor = useSlate();
    const onResize = useCallback(
        (width: any) => {
            if (!width) return;
            dispatch(editorActions.setWidth(width));
        },
        [dispatch]
    );
    const { ref } = useResizeDetector<HTMLDivElement>({ onResize });

    return (
        <div ref={ref}>
            <Info />

            <div className={cx('toolbar', { 'toolbar-on-header': onHeader })}>
                <Todo />

                <div className={cx('line')}></div>

                <History editor={editor} />

                <div className={cx('line')}></div>

                <Heading />

                <div className={cx('line')}></div>

                <FontFamily />

                <div className={cx('line')}></div>

                <FontSize />

                <div className={cx('line')}></div>

                <ColorPicker editor={editor} />

                <MarkButton content='Đậm' format='bold'>
                    <BoldIcon />
                </MarkButton>

                <MarkButton content='Nghiêng' format='italic'>
                    <ItalicIcon />
                </MarkButton>

                <MarkButton content='Gạch dưới' format='underline'>
                    <UnderlineIcon />
                </MarkButton>

                <div className={cx('line')}></div>

                <BlockButton content='Danh sách dấu đầu dòng' format='bulleted-list'>
                    <BulletedListIcon />
                </BlockButton>
                <BlockButton content='Danh sách đánh số' format='numbered-list'>
                    <NumberListIcon />
                </BlockButton>
                <BlockButton content='Danh sách kiểm tra' format='check-list-item'>
                    <TestListIcon />
                </BlockButton>

                <div className={cx('line')}></div>

                <Link editor={editor} />

                <div className={cx('line')}></div>

                <Align editor={editor} />

                <TextIndent editor={editor} />

                <div className={cx('line')}></div>

                <MarkButton content='Gạch ngang' format='through'>
                    <LineThrougnIcon />
                </MarkButton>
                <MarkButton content='Chỉ số trên' format='sup'>
                    <UpperIndexIcon />
                </MarkButton>

                <MarkButton content='Chỉ số dưới' format='sub'>
                    <SubScriptIcon />
                </MarkButton>

                <OverflowToolbar />
            </div>
        </div>
    );
}

export default memo(Toolbar);