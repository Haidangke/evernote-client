import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

import { draftWysiwygConfig } from 'config/draftWysiwygConfig';

import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './DraftWysiwyg.scss';
import styles from './DraftWysiwyg.module.scss';

function DraftWysiwyg() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
    };

    useEffect(() => {
        draftWysiwygConfig.forEach((item) => {
            const Icon = item.icon;
            const boldElement = document.querySelector(
                `.rdw-option-wrapper[title="${item.title}"]`
            );
            if (boldElement) {
                boldElement.innerHTML = renderToString(<Icon />);
            }
        });
    }, []);

    return (
        <Editor
            //state
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            //classNames
            wrapperClassName={styles.wrapper}
            editorClassName={styles.editor}
            toolbarClassName={styles.toolbar}
            //placeholder
            placeholder='Bắt đầu viết, kéo tệp hoặc chỉnh sửa một mẫu có sẵn'
            // toolbarOnFocus
            toolbar={{
                options: [
                    'history', //undo - redo
                    'blockType', //title
                    'fontFamily', //font-family
                    'fontSize',
                    'colorPicker',
                    'inline', //bold - italic - underline
                    'list', // ul - li - ol
                    'link', //link
                    'textAlign',
                    'emoji',
                    'image',
                    'remove',
                ],
                history: {},
                blockType: {
                    visible: false,
                    inDropdown: true,
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                },
                inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: [
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'monospace',
                        'superscript',
                        'subscript',
                    ],
                },
                list: { options: ['unordered', 'ordered', 'indent', 'outdent'], indent: {} },
                textAlign: { inDropdown: true },
                link: {
                    inDropdown: false,
                    showOpenOptionOnHover: true,
                    defaultTargetOption: '_self',
                    options: ['link'],
                },
            }}
        />
    );
}

export default DraftWysiwyg;
