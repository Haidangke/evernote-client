import styles from './Link.module.scss';

function Link({ attributes, children, element, style }: any) {
    const handleRedirect = () => {
        const href = element.href;
        window.open(href, '_blank');
    };
    return (
        <a
            href={element.href}
            className={styles.wrapper}
            {...attributes}
            style={style}
            onClick={handleRedirect}
        >
            {children}
        </a>
    );
}

export default Link;
