import { IconProps } from '.';

export const TagIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width={24}
        height={24}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.535 9.875a1.667 1.667 0 00-.368 1.045v6.909c0 .92.746 1.666 1.666 1.666h8.334c.92 0 1.666-.746 1.666-1.666V10.92c0-.38-.13-.749-.368-1.045L13.299 4.7a1.667 1.667 0 00-2.597 0L6.535 9.875zM12 12.022a1.666 1.666 0 10.002-3.332A1.666 1.666 0 0012 12.022z'
            fill='currentColor'
        />
    </svg>
);

export const TagSubIcon = ({ className }: IconProps) => (
    <svg
        width='14'
        height='14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path d='M7 6.5a1 1 0 100-2 1 1 0 000 2z' fill='currentColor'></path>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 6.273a2 2 0 01.52-1.345L5.89 1.22a1.5 1.5 0 012.22 0l3.37 3.707A2 2 0 0112 6.273V11a2 2 0 01-2 2H4a2 2 0 01-2-2V6.273zm9 0V11a1 1 0 01-1 1H4a1 1 0 01-1-1V6.273a1 1 0 01.26-.672l3.37-3.707a.5.5 0 01.74 0L10.74 5.6a1 1 0 01.26.672z'
            fill='currentColor'
        ></path>
    </svg>
);

export const AddTagOutlineIcon = ({ className }: IconProps) => (
    <svg
        width='14'
        height='14'
        viewBox='0 0 12 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ marginLeft: '1px' }}
        className={className}
    >
        <path
            d='M0 6.273a2 2 0 01.52-1.345L3.89 1.22a1.5 1.5 0 012.22 0l3.37 3.707A2 2 0 0110 6.273V7.5H9V6.273a1 1 0 00-.26-.672L5.37 1.894a.5.5 0 00-.74 0L1.26 5.6a1 1 0 00-.26.672V11a1 1 0 001 1h3.5v1H2a2 2 0 01-2-2V6.273z'
            fill='currentColor'
        ></path>
        <path
            d='M6 5.5a1 1 0 11-2 0 1 1 0 012 0zM9 9.5a.5.5 0 011 0V11h1.5a.5.5 0 010 1H10v1.5a.5.5 0 01-1 0V12H7.5a.5.5 0 010-1H9V9.5z'
            fill='currentColor'
        ></path>
    </svg>
);

export const AddTagSolidIcon = ({ className }: IconProps) => (
    <svg
        width='24'
        height='24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5 10.7a2 2 0 01.442-1.255l5-6.21a2 2 0 013.116 0l5 6.21A2 2 0 0119 10.699v3.052a5.5 5.5 0 00-5.002 7.238H7a2 2 0 01-2-2V10.7zm9-.654a1.999 1.999 0 01-2 1.998 1.999 1.999 0 112-1.998z'
            fill='currentColor'
        ></path>
        <path
            d='M19.965 16.254a.75.75 0 00-1.5 0v2.285H16.25a.75.75 0 000 1.5h2.215v2.215a.75.75 0 001.5 0V20.04h2.285a.75.75 0 000-1.5h-2.285v-2.285z'
            fill='currentColor'
        ></path>
    </svg>
);

export const TagFilterIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='24'
        height='24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.8 5.704a1.04 1.04 0 00-1.6 0L7.396 10.27a1.042 1.042 0 00-.242.667v6.274c0 .575.467 1.042 1.042 1.042h7.608c.575 0 1.042-.467 1.042-1.042v-6.274c0-.244-.086-.48-.242-.667l-3.803-4.566zm-2.56-.8a2.292 2.292 0 013.521 0l3.804 4.566c.343.412.53.93.53 1.467v6.274a2.292 2.292 0 01-2.291 2.292H8.196a2.292 2.292 0 01-2.292-2.292v-6.274c0-.536.188-1.055.531-1.467l3.805-4.567z'
            fill='currentColor'
        ></path>
        <path
            d='M13.667 10.338a1.667 1.667 0 11-3.334 0 1.667 1.667 0 013.334 0z'
            fill='currentColor'
        ></path>
    </svg>
);
