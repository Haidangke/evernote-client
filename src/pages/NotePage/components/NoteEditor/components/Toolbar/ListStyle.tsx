import React from 'react';
import { BulletedListIcon, NumberListIcon, TestListIcon } from '~/components/Icon/Toolbar';
import { BlockButton } from '../Button';

function ListStyle() {
    return (
        <>
            <BlockButton content='Danh sách dấu đầu dòng' format='bulleted-list'>
                <BulletedListIcon />
            </BlockButton>
            <BlockButton content='Danh sách đánh số' format='numbered-list'>
                <NumberListIcon />
            </BlockButton>
            <BlockButton content='Danh sách kiểm tra' format='check-list-item'>
                <TestListIcon />
            </BlockButton>
        </>
    );
}

export default ListStyle;
