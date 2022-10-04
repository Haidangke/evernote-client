export const charMatchString = (string: string, match: string) => {
    let result = '';
    for (let i = 0; i < match.length; i++) {
        const newMatch = result + match[i];
        if (string.match(newMatch)) {
            result += string[i];
        }
    }
    return { match: result, noMatch: string.slice(result.length, string.length) };
};
