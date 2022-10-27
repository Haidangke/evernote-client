import { ReactNode } from 'react';

import styles from './TippyCustom.module.scss';

interface TippyCustomProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;

    children: ReactNode;
    dropdown: ReactNode;

    placement: '';
}

function TippyCustom({ visible, setVisible, children, dropdown, placement }: TippyCustomProps) {
    return (
        <div>
            <div>{children}</div>
            <div>{dropdown}</div>
        </div>
    );
}

export default TippyCustom;
