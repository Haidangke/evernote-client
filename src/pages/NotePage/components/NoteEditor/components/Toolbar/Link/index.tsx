import { useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Button from '~/components/Button';

import { LinkIcon } from '~/components/Icon/Toolbar';
import Popper from '~/components/Popper';
import useOnClickOutside from '~/hooks/useOnclickOutside';
import styles from './Link.module.scss';
import { insertLink } from '../../../utils/link';

const cx = classNames.bind(styles);

function Link({ editor }: any) {
    const [visible, setVisible] = useState(false);
    const overflowingRef = useRef(null);

    const linkRef = useRef(null);

    const [link, setLink] = useState('');
    const [name, setName] = useState('');

    useOnClickOutside(linkRef, () => setVisible(false));
    return (
        <div ref={linkRef} className={cx('wrapper')}>
            <TippyHeadless
                visible={visible}
                placement='bottom-end'
                interactive
                render={(attrs) => (
                    <div {...attrs}>
                        <Popper>
                            <div className={cx('content')}>
                                <div className={cx('form')}>
                                    <div className={cx('field')}>
                                        <span>Tên liên kết</span>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder='Google'
                                            type='text'
                                        />
                                    </div>
                                    <div className={cx('field')}>
                                        <span>Liên kết</span>
                                        <input
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder='https://google.com'
                                            type='text'
                                        />
                                    </div>
                                </div>
                                <div className={cx('button')}>
                                    <Button
                                        variant='outline'
                                        onClick={() => setVisible(false)}
                                        content='Hủy'
                                    />
                                    <Button
                                        disabled={link.length === 0 || name.length === 0}
                                        variant='primary'
                                        onClick={() => {
                                            insertLink(editor, link, name);
                                            setVisible(false);
                                        }}
                                        content='Áp dụng'
                                    />
                                </div>
                            </div>
                        </Popper>
                    </div>
                )}
            >
                <button
                    ref={overflowingRef}
                    onClick={() => setVisible(!visible)}
                    className={cx('btn')}
                >
                    <LinkIcon />
                </button>
            </TippyHeadless>
        </div>
    );
}

export default Link;
