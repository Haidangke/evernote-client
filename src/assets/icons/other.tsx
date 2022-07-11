import { IconProps } from '.';

export const NoteToIcon = ({ className }: IconProps) => (
    <svg
        width={20}
        height={20}
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

export const FullSizeIcon = ({ className }: IconProps) => (
    <svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path
            fillRule='evenodd'
            d='M6.031 3a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3V6a3 3 0 00-3-3h-11zm4.47 4.289H8.184l2.915 2.914a.625.625 0 01-.884.884L7.3 8.172v2.319a.625.625 0 11-1.25 0V6.674c0-.351.285-.635.635-.635h3.818a.625.625 0 010 1.25zM12.6 15.76h2.318l-2.915-2.915a.625.625 0 11.884-.884l2.915 2.915V12.56a.625.625 0 011.25 0v3.817c0 .35-.285.635-.635.635H12.6a.625.625 0 110-1.25z'
        />
    </svg>
);

export const CustomHome = () => (
    <svg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19.657 15.1l-.266.267 1.568 1.558.263-.26c.43-.432.43-1.132 0-1.564a1.112 1.112 0 00-1.565 0zm-4.778 5.878c0 .059 0 .229.118.347.127.128.27.122.33.12l.018-.001c.414 0 1.405-.307 1.757-.662l2.993-2.994-1.565-1.557-2.989 2.99c-.351.35-.662 1.342-.662 1.757z'
            fill='currentColor'
        ></path>
        <path
            d='M6.726 11.618l-.904 1.012a.833.833 0 11-1.242-1.112l6.11-6.843a2.498 2.498 0 013.728 0l6.11 6.843a.835.835 0 01-1.243 1.112l-.904-1.012v2.402L17.03 15.37l.001.002-2.668 2.669c-.133.133-.25.282-.352.435v-4.145a1.458 1.458 0 10-2.914 0v4.924H8.393c-.92 0-1.667-.746-1.667-1.668v-5.97z'
            fill='currentColor'
        ></path>
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

export const AddNotebookIcon = ({ className }: IconProps) => (
    <svg
        className={className}
        width='24'
        height='24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path d='M5.955 4.5H8.03v15H5.955v-15z' fill='currentColor'></path>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.281 19.5v-15h7.09c.921 0 1.667.746 1.667 1.666v7.294h-.025a4.583 4.583 0 00-4.346 6.04H9.28zm5.88-9.167a.75.75 0 000-1.5h-3a.75.75 0 000 1.5h3z'
            fill='currentColor'
        ></path>
        <path
            d='M18.638 15.549a.625.625 0 10-1.25 0v1.904h-1.846a.625.625 0 100 1.25h1.846v1.846a.625.625 0 001.25 0v-1.846h1.904a.625.625 0 100-1.25h-1.904v-1.904z'
            fill='currentColor'
        ></path>
    </svg>
);

export const NotebookDfIcon = ({ className }: IconProps) => (
    <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <path d='M5.955 4.496H8.03v15H5.955v-15z' fill='currentColor'></path>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.281 19.496v-15h7.09c.92 0 1.667.746 1.667 1.666v7.307h-.045a4.583 4.583 0 00-4.351 6.027h-4.36zm5.88-9.167a.75.75 0 000-1.5h-3a.75.75 0 100 1.5h3z'
            fill='currentColor'
        ></path>
        <path
            d='M17.816 14.858a.24.24 0 01.451 0l.687 1.728c.035.089.114.15.206.157l1.782.15c.216.017.304.3.139.449l-1.357 1.218c-.07.062-.1.16-.08.253l.416 1.821c.05.221-.18.396-.365.278l-1.526-.976a.235.235 0 00-.255 0l-1.525.976c-.186.118-.415-.057-.365-.278l.415-1.82a.263.263 0 00-.079-.255l-1.357-1.217c-.166-.148-.078-.431.139-.45l1.782-.15a.245.245 0 00.206-.156l.686-1.728z'
            fill='currentColor'
        ></path>
    </svg>
);
