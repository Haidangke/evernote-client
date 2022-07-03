import { toolbarConfig } from 'config';
import CheckListItemElement from '../elements/CheckList';
import Image from './Image';
import Link from './Link';

const SlateElement = (props: any) => {
    const { attributes, children, element } = props;

    const style = {
        textAlign: element.align,
        fontSize: element.fontSize,
        color: element.color,
        paddingLeft: element.paddingLeft,
        fontFamily: element.fontFamily,
    };

    switch (element.type) {
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
            return <Link {...props} style={style} />;

        case 'image':
            return <Image {...props} />;
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

const SlateLeaf = ({ attributes, children, leaf }: any) => {
    const style = {
        fontSize: '16px',
        fontFamily: '"Source Sans Pro", sans-serif',
        color: 'rgb(0, 0, 0)',
    };
    for (const key in leaf) {
        if (toolbarConfig.fontSize.includes(key)) {
            style.fontSize = key;
        }
        if (toolbarConfig.fontFamily.map((item) => item.value).includes(key)) {
            style.fontFamily = key;
        }

        if (toolbarConfig.color.includes(key)) {
            style.color = key;
        }
    }

    if (leaf.bold) {
        children = <strong style={style}>{children}</strong>;
    }

    if (leaf.code) {
        children = <code style={style}>{children}</code>;
    }

    if (leaf.italic) {
        children = <em style={style}>{children}</em>;
    }

    if (leaf.underline) {
        children = <u style={style}>{children}</u>;
    }

    if (leaf.sup) {
        children = <sup style={style}>{children}</sup>;
    }

    if (leaf.sub) {
        children = <sub style={style}>{children}</sub>;
    }
    if (leaf.through) {
        children = <s style={style}>{children}</s>;
    }

    return (
        <span
            {...attributes}
            {...(leaf.highlight && { 'data-cy': 'search-highlighted' })}
            style={{
                ...style,
                fontWeight: leaf.bold && 'bold',
                backgroundColor: leaf.highlight && '#ffeeba',
            }}
        >
            {children}
        </span>
    );
};

export { SlateElement, SlateLeaf };