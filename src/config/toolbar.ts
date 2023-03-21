import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'components/Icons';

const fontSizes = [
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
];

const aligns = [
    { value: 'left', icon: AlignLeftIcon },
    { value: 'center', icon: AlignCenterIcon },
    { value: 'right', icon: AlignRightIcon },
];

const colors = [
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
];

const fontFamilies = [
    { value: '"Source Sans Pro", sans-serif', name: 'Sans Serif' },
    { value: '"Source Serif Pro", serif', name: 'Serif' },
    { value: '"Zilla Slab", serif', name: 'Slab Serif' },
    { value: '"Source Code Pro", monospace', name: 'Đơn cách' },
    { value: '"Dancing Script", cursive', name: 'Mã' },
    { value: '"Kalam", cursive', name: 'Viết tay' },
];

const headings = [
    {
        name: 'Tiêu đề lớn',
        value: 'header-one',
        size: '30px',
    },
    {
        name: 'Tiêu đề trung bình',
        value: 'header-two',
        size: '24px',
    },
    {
        name: 'Tiêu đề nhỏ',
        value: 'header-three',
        size: '18px',
    },
    {
        name: 'Văn bản thường',
        value: 'paragraph',
        size: '16px',
    },
];

const limitBtns = [
    {
        format: 'color',
        limit: 460,
    },
    {
        format: 'bold',
        limit: 482,
    },
    {
        format: 'italic',
        limit: 514,
    },
    {
        format: 'underline',
        limit: 546,
    },

    {
        format: 'bulleted-list',
        limit: 606,
    },
    {
        format: 'numbered-list',
        limit: 638,
    },

    {
        format: 'check-list-item',
        limit: 670,
    },
    {
        format: 'align',
        limit: 725,
    },
    {
        format: 'indent',
        limit: 754,
    },
    {
        format: 'outdent',
        limit: 786,
    },

    {
        format: 'through',
        limit: 823,
    },
    {
        format: 'sup',
        limit: 855,
    },
    {
        format: 'link',
        limit: 879,
    },
    {
        format: 'sub',
        limit: 885,
    },
];

const limits: { [key: string]: number } = {
    COLOR: 430,
    BOLD: 460,
    ITALIC: 490,
    UNDERLINE: 520,
    'unordered-list-item': 560,
    'ordered-list-item': 590,
    'check-list-item': 620,
    LINK: 660,
    ALIGN: 710,
    INDENT: 750,
    OUTDENT: 780,
    STRIKETHROUGH: 810,
};

export { fontSizes, aligns, fontFamilies, colors, headings, limitBtns, limits };
