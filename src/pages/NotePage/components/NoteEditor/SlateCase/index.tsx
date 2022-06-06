import CheckListItemElement from '../CheckList';

export const SlateElement = (props: any) => {
    const { attributes, children, element } = props;

    const style = {
        textAlign: element.align,
        fontSize: element.fontSize,
        color: element.color,
    };
    switch (element.type) {
        //table
        case 'table':
            return (
                <table>
                    <tbody {...attributes}>{children}</tbody>
                </table>
            );
        case 'table-row':
            return <tr {...attributes}>{children}</tr>;
        case 'table-cell':
            return <td {...attributes}>{children}</td>;

        //block-quote
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            );

        //heading
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            );
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            );
        case 'heading-three':
            return (
                <h3 style={style} {...attributes}>
                    {children}
                </h3>
            );
        case 'heading-normal':
            return (
                <div style={style} {...attributes}>
                    {children}
                </div>
            );

        //list
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            );
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            );
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            );

        case 'check-list-item':
            return <CheckListItemElement {...props} />;

        case 'link':
            return (
                <a style={style} {...attributes} href={element.url}>
                    {children}
                </a>
            );
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

export const SlateLeaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return (
        <span
            {...attributes}
            {...(leaf.highlight && { 'data-cy': 'search-highlighted' })}
            style={{
                fontWeight: leaf.bold && 'bold',
                backgroundColor: leaf.highlight && '#ffeeba',
            }}
        >
            {children}
        </span>
    );
};
