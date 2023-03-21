import TippyHeadLess from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { WrapperButton } from '.';
import styles from './Button.module.scss';

interface HandleProps {
    handle: (e: any) => any;
    tippy: string;
    children: any;

    disable?: boolean;
    format?: string;
    modal?: any;
}

const cx = classNames.bind(styles);

function Handle({ children, handle, tippy, disable, format, modal }: HandleProps) {
    return (
        <WrapperButton format={format}>
            <div>
                <TippyHeadLess
                    placement='bottom-start'
                    interactive
                    delay={[500, 0]}
                    render={(attrs) => (
                        <div className={cx('tippy-content')} {...attrs}>
                            {tippy}
                        </div>
                    )}
                >
                    <button
                        disabled={disable !== undefined ? disable : false}
                        onClick={handle}
                        className={cx('btn', { 'btn--disable': disable })}
                    >
                        {children}
                    </button>
                </TippyHeadLess>
                {modal}
            </div>
        </WrapperButton>
    );
}

export default Handle;
