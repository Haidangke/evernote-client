import TippyHeadLess from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { ButtonProps, WrapperButton } from '.';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Inline({ format, children, tippy, onClick, active }: ButtonProps) {
    return (
        <WrapperButton format={format}>
            <div>
                <TippyHeadLess
                    delay={[500, 0]}
                    placement={'bottom'}
                    render={(attrs) => (
                        <div className={cx('tippy-content')} {...attrs}>
                            {tippy}
                        </div>
                    )}
                >
                    <button
                        value={format}
                        className={cx('btn', {
                            'btn-active': active,
                        })}
                        onClick={onClick}
                    >
                        {children}
                    </button>
                </TippyHeadLess>
            </div>
        </WrapperButton>
    );
}

export default Inline;
