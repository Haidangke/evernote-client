import { useEffect, useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import Button from 'components/Button';
import { LinkIcon } from 'assets/icons/toolbar';
import Popper from 'components/Popper';
import useOnClickOutside from 'hooks/useOnclickOutside';
import { insertLink } from '../../../utils/link';
import useCheckOverflow from 'hooks/useCheckOverflow';
import styles from './Link.module.scss';

const cx = classNames.bind(styles);

function Link({ editor }: any) {
    const [visible, setVisible] = useState(false);

    const linkRef = useRef<HTMLDivElement>(null);

    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [isOverflow, setIsOverflow] = useState<boolean>(false);

    const check = useCheckOverflow(1026);
    useEffect(() => {
        if (check !== undefined) {
            setIsOverflow(!check);
        }
    }, [check]);
    useOnClickOutside(linkRef, () => setVisible(false));
    return !isOverflow ? (
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
                <button onClick={() => setVisible(!visible)} className={cx('btn')}>
                    <LinkIcon />
                </button>
            </TippyHeadless>
        </div>
    ) : (
        <></>
    );
}

export default Link;