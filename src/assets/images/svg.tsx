export const avatar_default = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
    >
        {' '}
        <circle cx={14} cy={14} r={14} fill="#CCCCCC" />{' '}
        <mask
            id="avatar_default"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={28}
            height={28}
        >
            {' '}
            <circle cx={14} cy={14} r={14} fill="#CCCCCC" />{' '}
        </mask>{' '}
        <g mask="url(#avatar_default)">
            {' '}
            <path
                d="M20.9703 21.1425C23.587 21.9946 24 22.3461 24 23.7793V28.8095C24 29.3618 23.5523 29.8095 23 29.8095H5.54913C4.69357 29.8095 4 29.1114 4 28.2503V23.7793C4 22.3461 4.41302 21.9946 7.02974 21.1425C9.46314 20.3501 10.821 19.4989 11.452 18.9271C11.8311 18.5837 11.6957 18.1198 11.3483 17.7441C10.5114 16.839 9.26241 15.2028 8.88272 12.7265C8.40433 9.60662 10.2137 6 14 6C17.7863 6 19.5957 9.60662 19.1173 12.7265C18.7376 15.2028 17.4886 16.839 16.6517 17.7441C16.3043 18.1198 16.1689 18.5837 16.548 18.9271C17.179 19.4989 18.5369 20.3501 20.9703 21.1425Z"
                fill="#737373"
            />{' '}
        </g>{' '}
    </svg>
);
