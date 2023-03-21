import { LinkIcon } from 'components/Icons';
import { HandleButton } from '../Button';

import { DraftToolbarProps } from '.';
import { useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import ModalCreate from 'components/Modal/ModalCreate';
import TextInput from 'components/Input/TextInput';
import styles from './Toolbar.module.scss';

function LinkEditor({ editorState, onChange }: DraftToolbarProps) {
    const [showURLInput, setShowURLInput] = useState(false);
    const [urlValue, setUrlValue] = useState('');

    const promptForLink = (e: any) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }
            setShowURLInput(true);
            setUrlValue(url);
            // // setTimeout(() => this.refs.url.focus(), 0);
        }
    };

    const confirmLink = (e: any) => {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();

        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
            url: urlValue,
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        // Apply entity
        let nextEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });

        // Apply selection
        nextEditorState = RichUtils.toggleLink(
            nextEditorState,
            nextEditorState.getSelection(),
            entityKey
        );

        onChange(nextEditorState);
        setShowURLInput(false);
        setUrlValue('');

        // setTimeout(() => this.refs.editor.focus(), 0);
    };

    const onLinkInputKeyDown = (e: any) => {
        if (e.which === 13) {
            confirmLink(e);
        }
    };

    const removeLink = (e: any) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            onChange(RichUtils.toggleLink(editorState, selection, null));
        }
    };

    return (
        <>
            <HandleButton
                tippy='Liên kết'
                format='LINK'
                handle={(e) => {
                    promptForLink(e);
                }}
            >
                <LinkIcon />
            </HandleButton>
            <ModalCreate
                action='Áp dụng'
                onSubmit={() => {}}
                isOpen={showURLInput}
                setIsOpen={setShowURLInput}
            >
                <div className={styles.urlInput}>
                    <TextInput
                        value={urlValue}
                        setValue={setUrlValue}
                        label='Liên kết'
                        placeholder='Thêm liên kết'
                    />
                </div>
            </ModalCreate>
            {/* {showURLInput && (
                <div>
                    <input
                        onChange={(e) => setUrlValue(e.target.value)}
                        type='text'
                        value={urlValue}
                        onKeyDown={onLinkInputKeyDown}
                    />
                    <button onMouseDown={confirmLink}> Confirm </button>
                </div>
            )} */}
        </>
    );
}

interface LinkModalProps {
    showURLInput: boolean;
    setShowURLInput: (showURLInput: boolean) => void;
}

export const Link = (props: any) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
};

export default LinkEditor;
