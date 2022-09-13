import styles from './Loading.module.scss';

interface LoadingProps {
    width?: string;
    height?: string;
}

function Loading({ width = '6rem', height = '6rem' }: LoadingProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 66 66'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.root}
        >
            <circle
                fill='none'
                strokeWidth='6'
                strokeLinecap='round'
                cx='33'
                cy='33'
                r='30'
            ></circle>
        </svg>
    );
}

export default Loading;
