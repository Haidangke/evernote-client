export const dateToLocalString = (date: Date) => {
    return date.toLocaleDateString();
};

export const localStringToDate = (string: string) => {
    return new Date(string);
};
