import { memo, useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import classNames from 'classnames/bind';

import { editorActions } from 'features/editor/editorSlice';
import { useAppDispatch } from 'app/hooks';
import { BlockButton, HandleButton, InlineButton } from '../Button';
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
import FontSize from './FontSize';
import ColorPicker from './ColorPicker';
import Align from './Align';
import LinkEditor from './LinkEditor';
import Indent from './Indent';
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
        <div className={styles.wrapper} ref={ref}>
            {/* <Info /> */}

            <div className={cx('toolbar', { 'toolbar-on-header': onHeader })}>
                <HandleButton
                    // disable={undos.length === 0}
                    handle={() => onChange(EditorState.undo(editorState))}
                    tippy='Hoàn tác'
                    // className={cx({ 'btn--disable': undos.length === 0 })}
                >
                    <UndoTcon />
                </HandleButton>
                {/* redo */}
                <HandleButton
                    // disable={redos.length === 0}
                    handle={() => onChange(EditorState.redo(editorState))}
                    tippy='Làm lại'
                    // className={cx({ 'btn--disable': redos.length === 0 })}
                >
                    <RedoIcon />
                </HandleButton>
                <div className={cx('line')}></div>
                <Heading onChange={onChange} editorState={editorState} />
                <div className={cx('line')}></div>
                <FontFamily />
                <div className={cx('line')}></div>
                <FontSize />
                <div className={cx('line')}></div>
                <ColorPicker />
                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
                    }}
                    tippy='Đậm'
                    format='bold'
                >
                    <BoldIcon />
                </InlineButton>
                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
                    }}
                    tippy='Nghiêng'
                    format='italic'
                    active={editorState.getCurrentInlineStyle().has('ITALIC')}
                >
                    <ItalicIcon />
                </InlineButton>
                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
                    }}
                    tippy='Gạch dưới'
                    format='underline'
                    active={editorState.getCurrentInlineStyle().has('UNDERLINE')}
                >
                    <UnderlineIcon />
                </InlineButton>
                <div className={cx('line')}></div>
                <BlockButton
                    tippy='Danh sách dấu đầu dòng'
                    format='bulleted-list'
                    onClick={() => {
                        onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
                    }}
                    active={RichUtils.getCurrentBlockType(editorState) === 'unordered-list-item'}
                >
                    <BulletedListIcon />
                </BlockButton>
                <BlockButton
                    tippy='Danh sách đánh số'
                    format='numbered-list'
                    onClick={() => {
                        onChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
                    }}
                    active={RichUtils.getCurrentBlockType(editorState) === 'ordered-list-item'}
                >
                    <NumberListIcon />
                </BlockButton>

                <BlockButton
                    tippy='Danh sách kiểm tra'
                    format='check-list-item'
                    onClick={() => {
                        onChange(RichUtils.toggleBlockType(editorState, 'check-list-item'));
                    }}
                    active={RichUtils.getCurrentBlockType(editorState) === 'check-list-item'}
                >
                    <TestListIcon />
                </BlockButton>
                <div className={cx('line')}></div>

                <LinkEditor editorState={editorState} onChange={onChange} />

                <div className={cx('line')}></div>
                <Align onChange={onChange} editorState={editorState} />
                <Indent  onChange={onChange} editorState={editorState}/>
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
