export type SortConfig = 'updatedAt' | 'title' | 'createdAt';

export const sortConfig: Array<{ name: string; value: SortConfig }> = [
    { name: 'Tiêu đề', value: 'title' },
    { name: 'Ngày cập nhật', value: 'updatedAt' },
    { name: 'Ngày tạo', value: 'createdAt' },
];
