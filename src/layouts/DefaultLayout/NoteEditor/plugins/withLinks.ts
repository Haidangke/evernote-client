const withLinks = (editor: any) => {
    const { isInline } = editor;
    editor.isInline = (element: any) => (element.type === 'link' ? true : isInline(element));
    return editor;
};

export default withLinks;
