import { memo, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import classNames from 'classnames/bind';

import { editorActions } from 'features/editor/editorSlice';
import { useAppDispatch } from 'app/hooks';
import { HandleButton, InlineButton } from '../Button';
import {
    BoldIcon,
    BulletedListIcon,
    ItalicIcon,
    LineThrougnIcon,
    NumberListIcon,
    RedoIcon,
    SubScriptIcon,
    TestListIcon,
    UnderlineIcon,
    UndoTcon,
    UpperIndexIcon,
} from 'components/Icons';

import styles from './Toolbar.module.scss';
import { EditorState, RichUtils } from 'draft-js';
import Heading from './Heading';
import FontFamily from './FontFamily';
const cx = classNames.bind(styles);

export interface DraftToolbarProps {
    onHeader?: boolean;
    onChange: any;
    editorState: EditorState;
}

function DraftToolbar({ onHeader, onChange, editorState }: DraftToolbarProps) {
    const dispatch = useAppDispatch();

    const { width, height, ref } = useResizeDetector();

    useEffect(() => {
        if (!width) return;
        dispatch(editorActions.setWidth(width));
    }, [width, dispatch]);
    return (
        <div ref={ref}>
            {/* <Info /> */}

            <div className={cx('toolbar', { 'toolbar-on-header': onHeader })}>
                <HandleButton
                    // disable={undos.length === 0}
                    handle={() => onChange(EditorState.undo(editorState))}
                    content='Hoàn tác'
                    // className={cx({ 'btn--disable': undos.length === 0 })}
                >
                    <UndoTcon />
                </HandleButton>

                {/* redo */}
                <HandleButton
                    // disable={redos.length === 0}
                    handle={() => onChange(EditorState.redo(editorState))}
                    content='Làm lại'
                    // className={cx({ 'btn--disable': redos.length === 0 })}
                >
                    <RedoIcon />
                </HandleButton>

                <div className={cx('line')}></div>

                <Heading onChange={onChange} editorState={editorState} />

                <div className={cx('line')}></div>

                <FontFamily onChange={onChange} editorState={editorState} />

                <div className={cx('line')}></div>

                {/* <FontSize /> */}

                <div className={cx('line')}></div>

                {/* <ColorPicker editor={editor} /> */}

                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleCode(editorState));
                    }}
                    content='Đậm'
                    format='bold'
                >
                    <BoldIcon />
                </InlineButton>

                {/* <MarkButton content='Nghiêng' format='italic'>
                    <ItalicIcon />
                </MarkButton> */}

                {/* <MarkButton content='Gạch dưới' format='underline'>
                    <UnderlineIcon />
                </MarkButton> */}

                <div className={cx('line')}></div>

                {/* <BlockButton content='Danh sách dấu đầu dòng' format='bulleted-list'>
                    <BulletedListIcon />
                </BlockButton> */}
                {/* <BlockButton content='Danh sách đánh số' format='numbered-list'>
                    <NumberListIcon />
                </BlockButton> */}
                {/* 
                <BlockButton content='Danh sách kiểm tra' format='check-list-item'>
                    <TestListIcon />
                </BlockButton> */}

                <div className={cx('line')}></div>

                {/* <Link editor={editor} /> */}

                <div className={cx('line')}></div>

                {/* <Align editor={editor} /> */}

                {/* <TextIndent editor={editor} /> */}

                <div className={cx('line')}></div>

                {/* <MarkButton content='Gạch ngang' format='through'>
                    <LineThrougnIcon />
                </MarkButton>
                <MarkButton content='Chỉ số trên' format='sup'>
                    <UpperIndexIcon />
                </MarkButton>

                <MarkButton content='Chỉ số dưới' format='sub'>
                    <SubScriptIcon />
                </MarkButton>

                <OverflowToolbar /> */}
            </div>
        </div>
    );
}

export default memo(DraftToolbar);
