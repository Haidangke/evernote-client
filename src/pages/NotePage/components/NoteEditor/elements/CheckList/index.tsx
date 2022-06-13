import { Transforms } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';
import classNames from 'classnames/bind';

import styles from './CheckList.module.scss';
const cx = classNames.bind(styles);

function CheckListItemElement({ attributes, children, element }: any) {
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
}

export default CheckListItemElement;
