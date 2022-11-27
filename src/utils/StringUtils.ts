export const charMatchString = (string: string, match: string) => {
    let result = '';
    for (let i = 0; i < match.length; i++) {
        const newMatch = result + match[i];
        if (string.match(newMatch)) {
            result += match[i];
        }
    }
    return { match: result, noMatch: string.slice(result.length, string.length) };
};

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
