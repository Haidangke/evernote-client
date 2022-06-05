import classNames from 'classnames/bind';

import {
    DeleteIcon,
    HomeIcon,
    NotebookIcon,
    NoteIcon,
    NoteSolidIcon,
    StarIcon,
    TagIcon,
    TodoIcon,
} from '~/components/Icon';
import Sticky from '../Sticky';
import styles from '~/layouts/components/Sidebar/Sidebar.module.scss';

const cx = classNames.bind(styles);

function Features() {
    return (
        <div className={cx('features')}>
            <Sticky name='Trang chủ' path='/' Icon={HomeIcon} type='link' />
            <Sticky
                name='Lối tắt'
                Icon={StarIcon}
                type='menu'
                items={[
                    { name: 'Chưa có tiêu đề', Icon: NoteSolidIcon },
                    { name: 'Chưa có tiêu đề', Icon: NoteSolidIcon },
                    { name: 'Chưa có tiêu đề', Icon: NoteSolidIcon },
                ]}
            />
            <Sticky name='Ghi chú' path='/note' Icon={NoteIcon} type='link' onAdd={() => {}} />
            <Sticky name='Nhiệm vụ' path='/todo' Icon={TodoIcon} type='menu' onAdd={() => {}} />
            <div className={cx('line-space')}></div>

            <Sticky
                name='Sổ tay'
                path='/notebook'
                Icon={NotebookIcon}
                type='link-menu'
                onAdd={() => {}}
            />
            <Sticky name='Thẻ' path='/tag' Icon={TagIcon} type='menu' onAdd={() => {}} />
            <div className={cx('line-space')}></div>
            <Sticky name='Thùng rác' path='/recycle' Icon={DeleteIcon} type='link' />
        </div>
    );
}

export default Features;
