import { Text } from 'slate';
import { useCallback } from 'react';

function useDecorate(search: string) {
    const decorate = useCallback(
        ([node, path]: any) => {
            const ranges: any = [];

            if (search && Text.isText(node)) {
                const { text } = node;
                const parts = text.split(search);
                let offset = 0;

                parts.forEach((part, i) => {
                    if (i !== 0) {
                        ranges.push({
                            anchor: { path, offset: offset - search.length },
                            focus: { path, offset },
                            highlight: true,
                        });
                    }

                    offset = offset + part.length + search.length;
                });
            }

            return ranges;
        },
        [search]
    );
    return decorate;
}

export default useDecorate;
