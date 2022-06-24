export type Sort = 'updatedAt' | 'title' | 'createdAt';

export interface ActionsType {
    sort: Sort;
}

interface ActionsConfig {
    sort: Array<{
        name: string;
        value: Sort;
    }>;
}

export const actionsConfig: ActionsConfig = {
    sort: [
        { name: 'Tiêu đề', value: 'title' },
        { name: 'Ngày cập nhật', value: 'updatedAt' },
        { name: 'Ngày tạo', value: 'createdAt' },
    ],
};
