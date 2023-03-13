export interface LoginParams {
    email: string;
    password: string;
    deviceToken: string;
}

export interface RegisterParams {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface User {
    username: string;
    email: string;
    avatar: string;
    role: string;
    scratch: string;
}
