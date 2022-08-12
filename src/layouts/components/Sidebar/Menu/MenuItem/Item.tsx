import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import useNavigateParams from 'hooks/useNavigateParams';
import { ItemProps, Types } from '.';

import styles from '../Menu.module.scss';
const cx = classNames.bind(styles);

function Item({ data, types, page }: { data?: ItemProps; types: Types; page?: string }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigateParams();

    if (!data) return <></>;

    return (
        <>
            {data.map((item) => {
                const ItemIcon = item.icon;
                const path = item.navigate?.path;
                const params = item.navigate?.params;
                return (
                    <div
                        key={item.name}
                        className={cx('sub', {
                            sub__active:
                                item._id === searchParams.get(item.type.value) &&
                                page === 'notebook',
                        })}
                        onClick={() =>
                            !types.includes('slide') &&
                            navigate(path || `/${item.type.name}`, {
                                [item.type.value]: item._id,
                                ...params,
                            })
                        }
                    >
                        <ItemIcon width={20} height={20} className={cx('sub-icon')} />
                        <div className={cx('sub-name')}>{item.name || 'Chưa có tiêu đề'}</div>
                    </div>
                );
            })}
        </>
    );
}

export default Item;
