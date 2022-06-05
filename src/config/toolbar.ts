import { AlignCenterIcon, AlignIcon, AlignRightIcon } from '~/components/Icon/Toolbar';

export const toolbar = {
    heading: [
        { value: 'heading-one', name: 'Tiêu đề lớn', size: '2em' },
        { value: 'heading-two', name: 'Tiêu đề trung bình', size: '1.5em' },
        { value: 'heading-three', name: 'Tiêu đề nhỏ', size: '1.17em' },
        { value: 'heading-normal', name: 'Văn bản thường', size: '1em' },
    ],

    fontSize: [
        '8px',
        '9px',
        '10px',
        '14px',
        '16px',
        '18px',
        '20px',
        '24px',
        '30px',
        '36px',
        '48px',
        '64px',
        '72px',
        '96px',
    ],
    align: [
        { value: 'left', icon: AlignIcon },
        { value: 'center', icon: AlignCenterIcon },
        { value: 'right', icon: AlignRightIcon },
    ],
    color: [
        'rgb(51, 51, 51)',
        'rgb(90, 90, 90)',
        'rgb(140, 140, 140)',
        'rgb(191, 191, 191)',
        'rgb(255, 255, 255)',
        'rgb(87, 36, 194)',
        'rgb(192, 41, 212)',
        'rgb(252, 18, 51)',
        'rgb(251, 95, 44)',
        'rgb(229, 158, 37)',
        'rgb(26, 196, 178)',
        'rgb(24, 133, 226)',
        'rgb(13, 58, 90)',
        'rgb(24, 168, 65)',
    ],
};
