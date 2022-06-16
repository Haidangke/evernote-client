import React from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '~/assets/icons/toolbar';
import { MarkButton } from '../Button';

function FontStyle() {
    return (
        <>
            <MarkButton content='Đậm' format='bold'>
                <BoldIcon />
            </MarkButton>

            <MarkButton content='Nghiêng' format='italic'>
                <ItalicIcon />
            </MarkButton>

            <MarkButton content='Gạch dưới' format='underline'>
                <UnderlineIcon />
            </MarkButton>
        </>
    );
}

export default FontStyle;
