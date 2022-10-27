import { IconProps } from '.';

export const NoteToIcon = ({ className, width = 20, height = 20 }: IconProps) => (
    <svg
        width={width}
        height={height}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M6.042 2.5A2.292 2.292 0 003.75 4.792v10.416A2.292 2.292 0 006.042 17.5h5.605a4.569 4.569 0 01-.229-1.25H6.042A1.042 1.042 0 015 15.208V4.792c0-.576.466-1.042 1.042-1.042h7.916c.576 0 1.042.466 1.042 1.042v6.786a4.6 4.6 0 011.25-.102V4.792A2.292 2.292 0 0013.958 2.5H6.042z'
            fill='currentColor'
        />
        <path
            d='M13.327 6.8c0 .346-.28.626-.625.626H7.298a.625.625 0 010-1.25h5.404c.345 0 .625.28.625.625zm-.625 3.75a.625.625 0 100-1.25H7.298a.625.625 0 000 1.25h5.404zm-3.738 3.125a.625.625 0 100-1.25H7.298a.625.625 0 100 1.25h1.666zm9.626 3.062a.982.982 0 000-1.39l-.002-.001-1.843-1.72a.623.623 0 00-.88.882l.004.004 1.014.907h-3.06c-.307 0-.532.294-.532.623 0 .33.225.623.533.623h3.055l-1.014.884a.623.623 0 00.88.882l1.845-1.694z'
            fill='currentColor'
        />
    </svg>
);

export const NoteMainIcon = ({ className }: IconProps) => (
    <svg
        width={14}
        height={14}
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 1h8a2 2 0 012 2v4h-1V3a1 1 0 00-1-1H5v10h2.5v1H2V1zm1 11V2h1v10H3z'
            fill='currentColor'
        />
        <path
            d='M11.448 8.639a.211.211 0 00-.396 0l-.605 1.52a.216.216 0 01-.18.139l-1.569.131c-.19.016-.268.265-.123.396l1.195 1.071a.232.232 0 01.07.224l-.366 1.602c-.044.195.158.349.322.244l1.342-.858a.207.207 0 01.224 0l1.342.858c.164.105.366-.05.322-.244l-.365-1.602a.232.232 0 01.069-.224l1.195-1.071c.145-.13.067-.38-.123-.396l-1.568-.131a.216.216 0 01-.181-.138l-.605-1.521zM10 5.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5z'
            fill='currentColor'
        />
    </svg>
);

export const AddNoteIcon = ({ className }: IconProps) => (
    <svg
        width='24'
        height='24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M7.254 3.002a2.75 2.75 0 00-2.75 2.75v12.5a2.75 2.75 0 002.75 2.75h6.747a5.49 5.49 0 01-.284-1.623l-.118.123H7.254c-.69 0-1.25-.56-1.25-1.25v-12.5c0-.69.56-1.25 1.25-1.25h9.5c.69 0 1.25.56 1.25 1.25v8.131a5.519 5.519 0 011.5-.126V5.752a2.75 2.75 0 00-2.75-2.75h-9.5z'
            fill='currentColor'
        ></path>
        <path
            d='M15.996 8.163a.75.75 0 01-.75.75H8.761a.75.75 0 110-1.5h6.486a.75.75 0 01.75.75zm-.75 4.499a.75.75 0 000-1.5H8.761a.75.75 0 000 1.5h6.486zm-4.485 3.75a.75.75 0 100-1.5h-2a.75.75 0 000 1.5h2zm9.204-.156a.75.75 0 00-1.5 0v2.285h-2.216a.75.75 0 100 1.5h2.216v2.215a.75.75 0 101.5 0v-2.215h2.284a.75.75 0 000-1.5h-2.284v-2.285z'
            fill='currentColor'
        ></path>
    </svg>
);

export const NewNoteIcon = ({ className }: IconProps) => (
    <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <circle cx='12' cy='12' r='12' fill='#00A82D'></circle>
        <g clipPath='url(#new-note)' fill='#fff'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.39 6.222H8.67a1.28 1.28 0 00-1.28 1.28v8.958c0 .706.573 1.28 1.28 1.28h4.607a3.52 3.52 0 013.393-4.626V7.502a1.28 1.28 0 00-1.28-1.28zm-.835 3.04a.48.48 0 01-.48.48h-4.15a.48.48 0 110-.96h4.15a.48.48 0 01.48.48zm-1.888 3.201a.48.48 0 100-.96H9.924a.48.48 0 100 .96h2.743zm-.983 2.234a.48.48 0 01-.48.48h-1.28a.48.48 0 110-.96h1.28a.48.48 0 01.48.48z'
            ></path>
            <path d='M17.1 14.718a.48.48 0 10-.96 0v1.462H14.72a.48.48 0 100 .96h1.418v1.418a.48.48 0 10.96 0V17.14h1.462a.48.48 0 100-.96H17.1v-1.462z'></path>
        </g>
        <defs>
            <clipPath id='new-note'>
                <path fill='#fff' transform='translate(4.32 4.32)' d='M0 0h15.36v15.36H0z'></path>
            </clipPath>
        </defs>
    </svg>
);

export const NoteIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        fontSize={24}
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.665 4.5h8.75c.92 0 1.667.746 1.667 1.667v8.748h-3.334a.625.625 0 0 0-.625.624v3.958H7.665c-.92 0-1.667-.747-1.667-1.667V6.167c0-.92.747-1.667 1.667-1.667Zm7.037 4.584a.625.625 0 1 0 0-1.25H9.298a.625.625 0 1 0 0 1.25h5.404Zm.625 2.918c0 .345-.28.625-.625.625H9.298a.625.625 0 0 1 0-1.25h5.404c.345 0 .625.28.625.625Zm-4.363 4.158a.625.625 0 1 0 0-1.25H9.298a.625.625 0 1 0 0 1.25h1.666Z'
            fill='currentColor'
        />
        <path d='M15.373 16.164h2.157l-2.107 2.693-.05.06v-2.753Z' fill='currentColor' />
    </svg>
);

export const NoteSolidIcon = ({ className }: IconProps) => (
    <svg
        width={18}
        height={18}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M14.702 9.426a.625.625 0 100-1.25H9.298a.625.625 0 000 1.25h5.404zm.625 2.499c0 .345-.28.625-.625.625H9.298a.625.625 0 110-1.25h5.404c.345 0 .625.28.625.625zm-4.363 3.75a.625.625 0 100-1.25H9.298a.625.625 0 100 1.25h1.666z'
            fill='currentColor'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.75 6.792A2.292 2.292 0 018.042 4.5h7.916a2.292 2.292 0 012.292 2.292v7.8a2.29 2.29 0 01-.497 1.425l-2.08 2.617a2.292 2.292 0 01-1.793.866H8.041a2.292 2.292 0 01-2.292-2.292V6.792zM8.042 5.75C7.466 5.75 7 6.216 7 6.792v10.416c0 .576.466 1.042 1.042 1.042h5.287v-3.195c0-.346.28-.625.625-.625H17V6.792c0-.576-.466-1.042-1.042-1.042H8.042zm6.653 12.106a1.043 1.043 0 01-.116.124v-2.3h1.845l-1.729 2.176z'
            fill='currentColor'
        />
    </svg>
);

export const NoteSolidSubIcon = ({ className }: IconProps) => (
    <svg
        width='14'
        height='14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            d='M9.162 5a.5.5 0 000-1H4.838a.5.5 0 000 1h4.324zm.5 2a.5.5 0 01-.5.5H4.838a.5.5 0 010-1h4.324a.5.5 0 01.5.5zm-3.49 3a.5.5 0 000-1H4.838a.5.5 0 100 1h1.334z'
            fill='currentColor'
        ></path>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 2.833C2 1.821 2.82 1 3.833 1h6.334C11.179 1 12 1.82 12 2.833v6.24c0 .415-.14.816-.398 1.14L9.94 12.308A1.833 1.833 0 018.504 13h-4.67A1.833 1.833 0 012 11.167V2.833zM3.833 2A.833.833 0 003 2.833v8.334c0 .46.373.833.833.833h4.23V9.444a.5.5 0 01.5-.5H11v-6.11A.833.833 0 0010.167 2H3.833zm5.23 9.784v-1.84h1.476l-1.476 1.84z'
            fill='currentColor'
        ></path>
    </svg>
);

export const NoteTitleIcon = ({ className, width = 16, height = 18 }: IconProps) => (
    <svg
        width={width}
        height={height}
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
