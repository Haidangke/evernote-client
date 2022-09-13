import { ReactNode, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';

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
}

function TippyHeadLess({
    children,
    visible,
    setVisible,
    dropdown,
    outside = true,
    ...props
}: TippyHeadLessProps) {
    const ref = useRef(null);
    const [isAnimation, setIsAnimation] = useState(false);
    useOnClickOutside(ref, () => {
        if (outside) setVisible(false);
    });
    return (
        <div style={{ width: 'inherit', height: '100%' }} ref={ref}>
            <Tippy
                offset={[0, 0]}
                // placement='bottom-end'
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
                        <Popper>{dropdown}</Popper>
                    </div>
                )}
                {...props}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default TippyHeadLess;
