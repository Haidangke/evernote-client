import { ReactNode, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';

import Popper from 'components/Popper';
import useOnClickOutside from 'hooks/useOnclickOutside';
import 'tippy.js/animations/shift-away.css';

interface TippyHeadLessProps {
    children: ReactNode | any;
    outside?: boolean;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    dropdown: ReactNode;
    [key: string]: any;
    placement?: Placement;
    className?: string;
}

function TippyHeadLess({
    children,
    visible,
    setVisible,
    dropdown,
    outside = true,
    placement,
    className,
    ...props
}: TippyHeadLessProps) {
    const ref = useRef(null);
    const [isAnimation, setIsAnimation] = useState(false);
    useOnClickOutside(ref, () => {
        if (outside) setVisible(false);
    });
    return (
        <>
            <Tippy
                ref={ref}
                offset={[0, 0]}
                placement={placement || 'bottom-end'}
                onMount={() => setIsAnimation(true)}
                onHide={(instance: any) => {
                    setIsAnimation(false);
                    const unmountInstance = () => {
                        instance.unmount();

                        instance.popper.firstChild.removeEventListener(
                            'transitionend',
                            unmountInstance
                        );
                    };

                    instance.popper.firstChild.addEventListener('transitionend', unmountInstance);
                }}
                visible={visible}
                render={(attrs) => (
                    <div
                        className='tippy-box'
                        data-state={isAnimation ? 'visible' : 'hidden'}
                        data-animation={'shift-away'}
                        style={{
                            transitionDuration: isAnimation ? '400ms' : '0',
                            pointerEvents: 'all',
                            width: '100%',
                        }}
                        {...attrs}
                    >
                        <Popper className={className}>{dropdown}</Popper>
                    </div>
                )}
                {...props}
            >
                {children}
            </Tippy>
        </>
    );
}

export default TippyHeadLess;
