export interface IconProps {
    width?: string | number;
    height?: string | number;
    className?: string;
}

export const Setting = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.765 12.025V12c0-1.083-.474-1.46-.854-1.764l-.12-.096c-.458-.381-.914-.938-.399-1.894.18-.333.59-1.04.882-1.544l.264-.454c.28-.485.774-1.076 1.878-.618.72.299 1.313.382 2.057-.108.725-.478.834-1.129.906-1.56V3.96c.094-.536.241-1.373 1.48-1.373H13.141c1.24 0 1.392.869 1.465 1.287v.002c.087.518.196 1.17.92 1.646.745.491 1.34.405 2.057.108 1.106-.457 1.6.133 1.878.617l.253.437.015.027.004.007c.292.503.696 1.199.874 1.526.516.958.059 1.516-.397 1.895l-.12.096-.002.002c-.377.3-.847.675-.853 1.743V12c0 1.085.474 1.462.855 1.765l.118.095c.457.379.914.936.4 1.894a77.01 77.01 0 01-.887 1.549l-.26.45c-.278.484-.774 1.073-1.878.618-.716-.299-1.309-.386-2.057.107-.723.476-.832 1.127-.905 1.559v.002c-.088.505-.24 1.374-1.48 1.374h-2.284c-1.237 0-1.385-.837-1.464-1.286l-.001-.004c-.087-.517-.196-1.168-.92-1.645-.746-.492-1.338-.406-2.056-.108-1.102.457-1.6-.132-1.877-.615l-.262-.452a80.365 80.365 0 01-.886-1.548c-.515-.957-.058-1.515.398-1.894l.119-.096c.378-.301.848-.675.856-1.74zm7.226-7.938h-1.113l-.008.046c-.097.59-.299 1.804-1.57 2.64-1.386.914-2.577.608-3.459.243a.059.059 0 00-.012-.005l-.247.427c-.286.49-.692 1.19-.869 1.518l.036.03.093.075.002.001c.459.366 1.41 1.123 1.42 2.909V12c0 1.807-.958 2.57-1.42 2.938l-.001.001-.095.076a.571.571 0 00-.033.028l-.001.001c.17.316.553.976.836 1.464l.28.481.004-.002h.003l.005-.002c.88-.369 2.072-.673 3.458.241 1.27.837 1.473 2.05 1.559 2.569l.004.026.016.092h2.242l.003-.02v-.004l.001-.002.003-.019v-.004c.102-.597.307-1.804 1.573-2.638 1.385-.915 2.576-.61 3.46-.241.002.002.005.003.007.003l.002.001.294-.506c.281-.485.655-1.128.823-1.439l-.012-.01-.023-.019-.094-.076-.002-.001c-.46-.366-1.411-1.125-1.42-2.914a.92.92 0 010-.024c0-1.807.959-2.57 1.42-2.938h.002l.095-.077a.55.55 0 01.013-.012h.002a.305.305 0 00.019-.018 80.647 80.647 0 00-.87-1.518l-.246-.426a.055.055 0 00-.012.004c-.885.366-2.074.67-3.458-.24-1.268-.837-1.472-2.048-1.56-2.565l-.012-.076-.007-.047H11.99zm0 5.91a1.88 1.88 0 00-1.82 1.396c-.13.487-.064.996.187 1.432.252.438.658.75 1.146.88.486.133.994.066 1.43-.187.438-.25.75-.658.882-1.145a1.889 1.889 0 00-1.825-2.376zm.008 5.276a3.404 3.404 0 01-2.941-1.698 3.368 3.368 0 01-.335-2.571 3.36 3.36 0 011.58-2.054 3.39 3.39 0 014.626 1.244c.452.783.57 1.696.335 2.57a3.36 3.36 0 01-1.581 2.055 3.352 3.352 0 01-1.684.454z'
            fill='currentColor'
        />
    </svg>
);

export const SearchIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg width={24} height={24} fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            className={className}
            width={width}
            height={height}
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z'
            fill='currentColor'
        />
    </svg>
);

export const ArrowDownIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
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

export const HomeIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5.269 12.877l.903-1.012v5.97c0 .922.746 1.669 1.667 1.669h2.704V14.58a1.458 1.458 0 112.914 0v4.924h2.704c.92 0 1.667-.747 1.667-1.669v-5.97l.903 1.012a.833.833 0 101.243-1.112l-6.11-6.843a2.498 2.498 0 00-3.727 0l-6.11 6.843a.835.835 0 001.242 1.112z'
            fill='currentColor'
        />
    </svg>
);

export const StarIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M19.277 11.107a20.43 20.43 0 01-1.593 1.811c-.426.456-.796.854-.948.949a.872.872 0 00-.265.796c0 .323.151 1.176.265 1.963.114.787.18 1.252.209 1.489.11.427-.038.878-.38 1.157a.853.853 0 01-.53.16 1.99 1.99 0 01-.835-.236l-2.636-1.318a1.487 1.487 0 00-.588-.19 1.527 1.527 0 00-.588.19c-.408.208-1.802.948-2.636 1.318a1.99 1.99 0 01-.835.237.853.853 0 01-.53-.161 1.128 1.128 0 01-.38-1.157c0-.237.114-.825.199-1.46.114-.797.247-1.67.275-1.992a.873.873 0 00-.228-.768 15.527 15.527 0 00-.891-.948c-1.005-1.138-1.498-1.631-1.631-1.84a1.147 1.147 0 01-.19-.996.948.948 0 01.655-.569c.636-.223 1.963-.464 1.963-.464s1.406-.183 2.057-.465a6.4 6.4 0 00.949-1.764l.227-.493c.56-1.195.816-1.735 1.442-1.782h.132a.37.37 0 01.143 0c.625.056.872.587 1.422 1.773l.237.502c.247.66.61 1.27 1.072 1.802.637.267 2.01.427 2.01.427s1.279.212 1.896.408c.315.071.576.29.702.587a1.18 1.18 0 01-.17 1.034z'
            fill='currentColor'
        />
    </svg>
);

export const NoteIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
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

export const NoteSolidIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const NoteListIcon = ({ width = '1.6rem', height = '1.8rem', className }: IconProps) => (
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

export const NoteToIcon = ({ width = '2rem', height = '2rem', className }: IconProps) => (
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

export const NoteMainIcon = ({ width = '1.4rem', height = '1.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const TodoIcon = ({ width = '1.6rem', height = '1.6rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-6.192-3.42a.836.836 0 00-.13-1.192.877.877 0 00-1.216.127l-5.942 7.202-3.069-2.77a.878.878 0 00-1.222.048.836.836 0 00.05 1.198l3.747 3.383a.876.876 0 001.259-.09l6.523-7.906z'
            fill='currentColor'
        />
    </svg>
);

export const AddIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const AddIconSmall = ({ width = '1rem', height = '1rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
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

export const TriangleIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 16'
    >
        <path fillRule='evenodd' d='M6 4l4 4-4 4z' fill='currentColor' />
    </svg>
);

export const NotebookIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path d='M8.035 4.5H5.958v15h2.077v-15z' fill='currentColor' />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.285 4.5v15h7.09c.92 0 1.667-.746 1.667-1.667V6.167c0-.92-.747-1.667-1.667-1.667h-7.09zm6.63 5.083a.75.75 0 01-.75.75h-3a.75.75 0 110-1.5h3a.75.75 0 01.75.75z'
            fill='currentColor'
        />
    </svg>
);

export const TagIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
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

export const DeleteIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M16.298 17.93l.494-8.846H7.208l.514 8.85c.05.88.78 1.57 1.664 1.57h5.248c.885 0 1.615-.692 1.664-1.575z'
            fill='currentColor'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.167 4.087a2.292 2.292 0 00-2.292 2.291v.205H5.75a.625.625 0 100 1.25h12.5a.625.625 0 100-1.25h-3.125v-.205a2.292 2.292 0 00-2.292-2.291h-1.666zm2.708 2.496v-.205c0-.575-.466-1.041-1.042-1.041h-1.666c-.576 0-1.042.466-1.042 1.041v.205h3.75z'
            fill='currentColor'
        />
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

export const SortIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const FilterIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const ViewIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const FullSizeIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
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

export const OtherIcon = ({ width = '2.4rem', height = '2.4rem', className }: IconProps) => (
    <svg
        width={width}
        height={height}
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-hidden='true'
    >
        <path d='M4.5 12a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm7.501 1.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z' />
    </svg>
);
