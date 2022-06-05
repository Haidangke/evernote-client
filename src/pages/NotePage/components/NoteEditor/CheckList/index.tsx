import classNames from 'classnames/bind';
import { Editor, Range, Transforms, Element as SlateElement, Point } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';

import styles from './CheckList.module.scss';
const cx = classNames.bind(styles);

 function CheckListItemElement ({ attributes, children, element }: any)  {
    const editor = useSlateStatic();
    const readOnly = useReadOnly();
    const { checked } = element;
    return (
        <div {...attributes} className={cx('wrapper')}>
            <span className={cx('input')}>
                <input
                    contentEditable={false}
                    type='checkbox'
                    checked={checked}
                    onChange={(event) => {
                        const path = ReactEditor.findPath(editor, element);
                        const newProperties: any = {
                            checked: event.target.checked,
                        };
                        Transforms.setNodes(editor, newProperties, { at: path });
                    }}
                />
            </span>

            <span
                className={cx('content')}
                contentEditable={!readOnly}
                suppressContentEditableWarning
            >
                {children}
            </span>
        </div>
    );
};

export default CheckListItemElement

export const withChecklists = (editor: any) => {
    const { deleteBackward } = editor;

    editor.deleteBackward = (...args: any) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const [match]: any = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    (n.type as string) === 'check-list-item',
            });

            if (match) {
                const [, path] = match;
                const start = Editor.start(editor, path);

                if (Point.equals(selection.anchor, start)) {
                    const newProperties: Partial<SlateElement> = {
                        type: 'paragraph',
                    };
                    Transforms.setNodes(editor, newProperties, {
                        match: (n) =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            (n.type as string) === 'check-list-item',
                    });
                    return;
                }
            }
        }

        deleteBackward(...args);
    };

    return editor;
};
