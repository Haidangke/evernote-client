import { IconProps } from '.';

export const ArrowDownIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        width={width}
        height={height}
        viewBox='0 0 14 14'
    >
        <defs>
            <path id='1a' d='M7 5.707l3.646 3.647.708-.708L7 4.293 2.646 8.646l.708.708z' />
        </defs>
        <use
            fill='currentColor'
            fillRule='nonzero'
            transform='matrix(1 0 0 -1 0 13.646)'
            xlinkHref='#1a'
        />
    </svg>
);

export const AddIcon = ({ className }: IconProps) => (
    <svg
        width={24}
        height={24}
        className={className}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M12 5.333a.833.833 0 00-.833.834v5h-5a.833.833 0 100 1.666h5v5a.833.833 0 001.666 0v-5h5a.833.833 0 000-1.666h-5v-5A.833.833 0 0012 5.333z'
            fill='currentColor'
        />
    </svg>
);

export const AddIconSmall = ({ className }: IconProps) => (
    <svg
        className={className}
        width={10}
        height={10}
        viewBox='0 0 10 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5.625 1.25a.625.625 0 10-1.25 0v3.125H1.25a.625.625 0 100 1.25h3.125V8.75a.625.625 0 101.25 0V5.625H8.75a.625.625 0 100-1.25H5.625V1.25z'
            fill='currentColor'
        />
    </svg>
);

export const CloseIcon = ({ width = '24', height = '24', className, onClick }: IconProps) => (
    <svg
        onClick={onClick}
        width={width}
        height={height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M17.53 6.47a.75.75 0 00-1.06 0L12 10.94 7.53 6.47a.75.75 0 00-1.06 1.06L10.94 12l-4.47 4.47a.75.75 0 101.06 1.06L12 13.06l4.47 4.47a.75.75 0 101.06-1.06L13.06 12l4.47-4.47a.75.75 0 000-1.06z'
            fill='currentColor'
        ></path>
    </svg>
);

export const ArrowLeftIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox='5 5 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.22 12.53a.75.75 0 010-1.06l4.5-4.5a.75.75 0 111.06 1.06L9.81 12l3.97 3.97a.75.75 0 11-1.06 1.06l-4.5-4.5z'
            fill='currentColor'
        />
    </svg>
);

export const MoreIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-hidden='true'
        fill='#737373'
    >
        <path d='M4.5 12a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm7.501 1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z'></path>
    </svg>
);
