import { IconProps } from '.';

export const NoteListIcon = ({ className }: IconProps) => (
    <svg
        width={16}
        height={18}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2.798 0h10.5a2 2 0 012 2v10.497h-4a.75.75 0 00-.75.75v4.749h-7.75a2 2 0 01-2-2V2a2 2 0 012-2zm8.445 5.5a.75.75 0 000-1.5H4.757a.75.75 0 100 1.5h6.486zm.75 3.502a.75.75 0 01-.75.75H4.757a.75.75 0 110-1.5h6.486a.75.75 0 01.75.75zm-5.236 4.99a.75.75 0 000-1.5h-2a.75.75 0 000 1.5h2z'
            fill='currentColor'
        />
        <path d='M12.048 13.997h2.588l-2.528 3.231-.06.073v-3.304z' fill='currentColor' />
    </svg>
);

export const SortIcon = ({ className }: IconProps) => (
    <svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M8.183 4.625a.625.625 0 00-1.25 0V17.87L5.067 16a.625.625 0 00-.884 0 .62.62 0 000 .88l2.933 2.94c.244.244.64.244.884 0l2.933-2.94a.62.62 0 000-.88.625.625 0 00-.884 0l-1.866 1.87V4.625zM11.625 5a.625.625 0 100 1.25h8.75a.625.625 0 100-1.25h-8.75zM11 9.375c0-.345.28-.625.625-.625h6.25a.625.625 0 110 1.25h-6.25A.625.625 0 0111 9.375zM11.625 12.5a.625.625 0 100 1.25h3.75a.625.625 0 100-1.25h-3.75z'
            fill='currentColor'
        />
    </svg>
);

export const FilterIcon = ({ className }: IconProps) => (
    <svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.898 6.933C3.958 5.747 4.803 4 6.316 4h11.368c1.513 0 2.358 1.747 1.417 2.933l-4.442 5.6v3.434c0 .688-.312 1.34-.847 1.774l-2.444 1.979c-.816.66-2.034.08-2.034-.97v-6.216L4.898 6.933zm1.418-1.688a.564.564 0 00-.442.915l4.705 5.94V18.751l.002.001.002.001.002-.001 2.444-1.979c.243-.197.385-.493.385-.806V12.1l4.712-5.94a.564.564 0 00-.442-.915H6.316z'
            fill='currentColor'
        />
    </svg>
);

export const ViewIcon = ({ className }: IconProps) => (
    <svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.375 6.95v-1.7H6a.75.75 0 00-.75.75v.95h7.125zm0 1.25H5.25v1.705h7.125V8.2zm0 2.955H5.25v1.7h7.125v-1.7zm0 2.95H5.25v1.7h7.125v-1.7zm0 2.95H5.25V18c0 .414.336.75.75.75h6.375v-1.695zM6 20a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6zm7.625-14.75H18a.75.75 0 01.75.75v12a.75.75 0 01-.75.75h-4.375V5.25z'
            fill='currentColor'
        />
    </svg>
);

export const TwoWayArrowIcon = ({ className }: IconProps) => (
    <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M17 19a.75.75 0 01-.75-.75V7.56l-2.72 2.72a.75.75 0 11-1.06-1.06l4-4a.75.75 0 011.06 0l4 4a.75.75 0 11-1.06 1.06l-2.72-2.72v10.69A.75.75 0 0117 19z'
            fill='#0081c2'
        ></path>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7 5a.75.75 0 00-.75.75v10.69l-2.72-2.72a.75.75 0 00-1.06 1.06l4 4a.75.75 0 001.06 0l4-4a.75.75 0 10-1.06-1.06l-2.72 2.72V5.75A.75.75 0 007 5z'
            fill='#E6E6E6'
        ></path>
    </svg>
);
