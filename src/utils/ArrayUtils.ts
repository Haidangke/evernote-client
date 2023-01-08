export const search = (array: Array<any>, searchValue: string, key?: string): Array<any> => {
    if (!Array.isArray(array)) return [];
    const search = searchValue.toString().trim().toLowerCase();
    let result = [];

    result = array.filter((item) =>
        (key ? item[key] : item).toString().trim().toLowerCase().includes(search)
    );

    return result;
};
