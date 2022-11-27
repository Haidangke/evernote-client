import { ReactNode, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';

import Popper from 'components/Popper';
import useOnClickOutside from 'hooks/useOnclickOutside';
import 'tippy.js/animations/shift-away.css';

interface TippyHeadLessProps {
    children: ReactNode | any;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    dropdown: ReactNode;

    disableClickOutside?: boolean;
    placement?: Placement;
    className?: string;

    disableContent?: boolean;
    disableAnimation?: boolean;
    [key: string]: any;
}

function TippyHeadLess({
    children,
    visible,
    setVisible,
    dropdown,
    disableClickOutside,
    disableContent,
    disableAnimation,
    placement,
    className,
}: TippyHeadLessProps) {
    const ref = useRef(null);
    const instanceRef = useRef<any>(null);
    const [isAnimation, setIsAnimation] = useState(false);

    useOnClickOutside(ref, (event: any) => {
        if (disableClickOutside) return;
        const { popper, reference, state } = instanceRef.current;
        if (
            !popper.contains(event.target) &&
            !reference.contains(event.target) &&
            !(state.isVisible && reference.contains(event.target))
        ) {
            setVisible(false);
        }
    });

    return (
        <>
            <Tippy
                onCreate={(instance) => {
                    instanceRef.current = instance;
                }}
                offset={[0, 0]}
                placement={placement}
                onMount={() => setIsAnimation(true)}
                // onHidden={() => setVisible(false)}
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
                        ref={ref}
                        className='tippy-box'
                        data-state={isAnimation ? 'visible' : 'hidden'}
                        data-animation={!disableAnimation ? 'shift-away' : ''}
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
            >
                <div
                    style={{ height: '100%' }}
                    onClick={() => {
                        if (disableContent) return;
                        !disableClickOutside && setVisible(!visible);
                    }}
                >
                    {children}
                </div>
            </Tippy>
        </>
    );
}

export function TippyHeadLessOneWay({
    children,
    dropdown,
    visible,
    setVisible,
    placement,
    disableClickOutside,
    disableContent,
    disableAnimation,
    className,
}: TippyHeadLessProps) {
    const ref = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef(null);

    useOnClickOutside(dropdownRef, (event: any) => {
        if (!ref.current || ref.current.contains(event.target) || disableClickOutside) return;
        setVisible(false);
    });

    return (
        <TippyHeadLess
            disableAnimation={disableAnimation}
            placement={placement}
            disableClickOutside={true}
            visible={visible}
            setVisible={setVisible}
            className={className}
            dropdown={
                visible ? (
                    <div style={{ padding: '12px 0' }} ref={dropdownRef}>
                        {dropdown}
                    </div>
                ) : (
                    <></>
                )
            }
        >
            <div
                ref={ref}
                style={{ display: 'flex', alignItems: 'center', height: '100%' }}
                onClick={() => {
                    if (disableContent) {
                        return setVisible(true);
                    }
                    setVisible(!visible);
                }}
            >
                {children}
            </div>
        </TippyHeadLess>
    );
}

export default TippyHeadLess;
