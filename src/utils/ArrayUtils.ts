export const search = (array: Array<any>, searchValue: string, key?: string): Array<any> => {
    if (!Array.isArray(array)) return [];
    const search = searchValue.toString().trim().toLowerCase();
    let result = [];

    result = array.filter((item) =>
        (key ? item[key] : item).toString().trim().toLowerCase().includes(search)
    );

    return result;
};

export const convertItemStyleMap = (arr: Array<string>, field: string) => {
    const obj: { [key: string]: any } = {};
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const value = { [field]: arr[i] };
        obj[key] = value;
    }

    return obj;
};
