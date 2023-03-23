import { memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useResizeDetector } from 'react-resize-detector';

import { useAppDispatch } from 'app/hooks';
import { draftActions } from 'features/draft/draftSlice';
import {
    BoldIcon,
    BulletedListIcon,
    ItalicIcon,
    LineThrougnIcon,
    NumberListIcon,
    RedoIcon,
    TestListIcon,
    UnderlineIcon,
    UndoTcon,
} from 'components/Icons';
import { HandleButton, InlineButton } from '../Button';

import { EditorState, RichUtils } from 'draft-js';
import Align from './Align';
import ColorPicker from './ColorPicker';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import Heading from './Heading';
import Indent from './Indent';
import LinkEditor from './LinkEditor';
import Info from '../Info';
import DropdownToolbar from '../DropdownToolbar';

import styles from './Toolbar.module.scss';
const cx = classNames.bind(styles);

export interface DraftToolProps {
    onChange: any;
    editorState: EditorState;
}

export interface DraftToolbarProps {
    onHeader: boolean;
    isToolbar: boolean;
    onChange: any;
    editorState: EditorState;
}

function DraftToolbar({ onHeader, isToolbar, onChange, editorState }: DraftToolbarProps) {
    const dispatch = useAppDispatch();

    const { width, height, ref } = useResizeDetector();

    useEffect(() => {
        if (!width) return;
        dispatch(draftActions.setWidth(width));
    }, [width, dispatch]);
    return (
        <div className={styles.wrapper} ref={ref}>
            <div className={cx('info', { 'info--hide': isToolbar })}>
                <Info />
            </div>
            <div className={cx('toolbar', { 'toolbar--blur': onHeader })}>
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
                    format='BOLD'
                >
                    <BoldIcon />
                </InlineButton>
                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
                    }}
                    tippy='Nghiêng'
                    format='ITALIC'
                    active={editorState.getCurrentInlineStyle().has('ITALIC')}
                >
                    <ItalicIcon />
                </InlineButton>
                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
                    }}
                    tippy='Gạch dưới'
                    format='UNDERLINE'
                    active={editorState.getCurrentInlineStyle().has('UNDERLINE')}
                >
                    <UnderlineIcon />
                </InlineButton>
                <div className={cx('line')}></div>
                <InlineButton
                    tippy='Danh sách dấu đầu dòng'
                    format='unordered-list-item'
                    onClick={() => {
                        onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
                    }}
                    active={RichUtils.getCurrentBlockType(editorState) === 'unordered-list-item'}
                >
                    <BulletedListIcon />
                </InlineButton>
                <InlineButton
                    tippy='Danh sách đánh số'
                    format='ordered-list-item'
                    onClick={() => {
                        onChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
                    }}
                    active={RichUtils.getCurrentBlockType(editorState) === 'ordered-list-item'}
                >
                    <NumberListIcon />
                </InlineButton>

                <InlineButton
                    tippy='Danh sách kiểm tra'
                    format='check-list-item'
                    onClick={() => {
                        onChange(RichUtils.toggleBlockType(editorState, 'check-list-item'));
                    }}
                    active={RichUtils.getCurrentBlockType(editorState) === 'check-list-item'}
                >
                    <TestListIcon />
                </InlineButton>
                <div className={cx('line')}></div>

                <LinkEditor editorState={editorState} onChange={onChange} />

                <div className={cx('line')}></div>
                <Align onChange={onChange} editorState={editorState} />
                <Indent onChange={onChange} editorState={editorState} />
                <div className={cx('line')}></div>

                <InlineButton
                    onClick={() => {
                        onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
                    }}
                    tippy='Gạch ngang'
                    format='STRIKETHROUGH'
                >
                    <LineThrougnIcon />
                </InlineButton>
                <DropdownToolbar />
                {/* <MarkButton content='Gạch ngang' format='through'>
                    <LineThrougnIcon />
                </MarkButton>
                
                <MarkButton content='Chỉ số trên' format='sup'>
                    <UpperIndexIcon />
                </MarkButton>

                <MarkButton content='Chỉ số dưới' format='sub'>
                    <SubScriptIcon />
                </MarkButton> */}
            </div>
        </div>
    );
}

export default memo(DraftToolbar);
