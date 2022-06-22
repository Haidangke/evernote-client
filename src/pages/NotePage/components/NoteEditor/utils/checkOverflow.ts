const checkOverflow = (textContainer: any, width: any): boolean => {
    if (textContainer) {
        const rect = textContainer.getBoundingClientRect();

        return rect.right + 100 < width;
    }

    return false;
};

export default checkOverflow;
